"""Convert a Panda3D .egg character (+ .egg animations, + .uvanim eye tracks) to a single .glb.

usage: egg2glb.py <src_dir> <out.glb> name=anim_file_stem ...
"""
import json, struct, sys, os, math
from panda3d.core import Filename, LMatrix4d, LQuaterniond, LVecBase3d, decompose_matrix, LMatrix3d, CS_yup_right
from panda3d.egg import (EggXfmAnimData, EggData, EggGroup, EggPolygon, EggVertexPool, EggTable, EggXfmSAnim, EggTexture)

src, out = sys.argv[1], sys.argv[2]
anim_args = [a.split('=', 1) for a in sys.argv[3:]]

def read_egg(path):
	d = EggData()
	assert d.read(Filename.from_os_specific(path)), path
	return d

model = read_egg(os.path.join(src, 'pm0474_00.egg'))

# --- skeleton -------------------------------------------------------------
joints = []  # dicts: name, parent, local(LMatrix4d), egg
def walk(node, parent):
	for child in node.get_children():
		if isinstance(child, EggGroup):
			if child.is_joint():
				idx = len(joints)
				m = child.get_transform3d() if child.has_transform() else LMatrix4d.ident_mat()
				joints.append(dict(name=child.get_name(), parent=parent, local=LMatrix4d(m), egg=child))
				walk(child, idx)
			else:
				walk(child, parent)
walk(model, -1)
jindex = {j['name']: i for i, j in enumerate(joints)}

def world(i):
	j = joints[i]
	if 'world' not in j:
		j['world'] = LMatrix4d(j['local']) if j['parent'] < 0 else j['local'] * world(j['parent'])
	return j['world']
for i in range(len(joints)): world(i)

def vkey(v):
	return (v.get_pool().get_name(), v.get_index())

# vertex -> [(joint, weight)]
weights = {}
def pools(node):
	for child in node.get_children():
		if isinstance(child, EggVertexPool): yield child
		elif hasattr(child, 'get_children'): yield from pools(child)
for pool in pools(model):
	for v in pool:
		for i, j in enumerate(joints):
			w = j['egg'].get_vertex_membership(v)
			if w > 0: weights.setdefault(vkey(v), []).append((i, w))

# --- geometry, grouped by texture ----------------------------------------
prims = {}  # texture filename -> list of vertex tuples (per corner)
pool_vertex_key = {}
def collect(node):
	for child in node.get_children():
		if isinstance(child, EggPolygon):
			tex = None
			for t in range(child.get_num_textures()):
				tx = child.get_texture(t)
				if tx.get_env_type() != EggTexture.ET_normal:
					tex = os.path.basename(tx.get_filename().get_fullpath())
			verts = [child.get_vertex(k) for k in range(child.get_num_vertices())]
			for k in range(1, len(verts) - 1):
				prims.setdefault(tex, []).extend([verts[0], verts[k], verts[k + 1]])
		elif hasattr(child, 'get_children'):
			collect(child)
collect(model)

def q(m3):
	quat = LQuaterniond()
	quat.set_from_matrix(m3)
	quat.normalize()
	return [quat.get_i(), quat.get_j(), quat.get_k(), quat.get_r()]

def trs(m):
	scale, shear, hpr, tr = LVecBase3d(), LVecBase3d(), LVecBase3d(), LVecBase3d()
	m3 = m.get_upper_3()
	sx = m3.get_row(0).length(); sy = m3.get_row(1).length(); sz = m3.get_row(2).length()
	n = LMatrix3d(m3)
	n.set_row(0, m3.get_row(0) / sx); n.set_row(1, m3.get_row(1) / sy); n.set_row(2, m3.get_row(2) / sz)
	t = m.get_row3(3)
	return [t[0], t[1], t[2]], q(n), [sx, sy, sz]

# --- binary buffer helpers ------------------------------------------------
buf = bytearray()
views, accessors = [], []
def add(data, fmt, count, ctype, atype, target=None, minmax=None):
	while len(buf) % 4: buf.append(0)
	off = len(buf)
	buf.extend(struct.pack('<' + fmt * (len(data)), *data))
	v = dict(buffer=0, byteOffset=off, byteLength=len(buf) - off)
	if target: v['target'] = target
	views.append(v)
	a = dict(bufferView=len(views) - 1, componentType=ctype, count=count, type=atype)
	if minmax: a['min'], a['max'] = minmax
	accessors.append(a)
	return len(accessors) - 1
F, U16, U8, U32 = 5126, 5123, 5121, 5125

# --- materials / textures -------------------------------------------------
images, textures, materials = [], [], []
def image(fname):
	with open(os.path.join(src, fname), 'rb') as f: data = f.read()
	while len(buf) % 4: buf.append(0)
	off = len(buf); buf.extend(data)
	views.append(dict(buffer=0, byteOffset=off, byteLength=len(data)))
	images.append(dict(bufferView=len(views) - 1, mimeType='image/png', name=fname))
	textures.append(dict(source=len(images) - 1, sampler=0))
	return len(textures) - 1

normal_for = {}  # SwSh _nor maps aren't tangent-space normal maps
tex_cache = {}
def tex(f):
	if f not in tex_cache: tex_cache[f] = image(f)
	return tex_cache[f]

# --- meshes ---------------------------------------------------------------
primitives = []
for texname, corners in prims.items():
	uniq, index = {}, []
	pos, nor, uv, jnt, wgt = [], [], [], [], []
	for v in corners:
		k = vkey(v)
		if k not in uniq:
			uniq[k] = len(uniq)
			p = v.get_pos3(); pos += [p[0], p[1], p[2]]
			n = v.get_normal() if v.has_normal() else (0, 1, 0); nor += [n[0], n[1], n[2]]
			t = v.get_uv() if v.has_uv() else (0, 0)
			u = t[0]
			if 'Eye' in texname:
				# fold the mirrored-repeat U into one cell, then shift into the left
				# (neutral) atlas column; UV anims move it right with ColorUVTranslateU
				tile = math.floor(u); u -= tile
				if tile % 2: u = 1 - u
				u -= 0.5
			uv += [u, 1 - t[1]]
			w = sorted(weights.get(k, [(jindex['pm0474_00'], 1.0)]), key=lambda x: -x[1])[:4]
			tot = sum(x[1] for x in w) or 1
			w = w + [(0, 0.0)] * (4 - len(w))
			jnt += [x[0] for x in w]; wgt += [x[1] / tot for x in w]
		index.append(uniq[k])
	n = len(uniq)
	xs, ys, zs = pos[0::3], pos[1::3], pos[2::3]
	attrs = dict(
		POSITION=add(pos, 'f', n, F, 'VEC3', 34962, ([min(xs), min(ys), min(zs)], [max(xs), max(ys), max(zs)])),
		NORMAL=add(nor, 'f', n, F, 'VEC3', 34962),
		TEXCOORD_0=add(uv, 'f', n, F, 'VEC2', 34962),
		JOINTS_0=add(jnt, 'H', n, U16, 'VEC4', 34962),
		WEIGHTS_0=add(wgt, 'f', n, F, 'VEC4', 34962),
	)
	idx = add(index, 'I', len(index), U32, 'SCALAR', 34963)
	mat = dict(name=texname.replace('pm0474_00_', '').replace('_col.png', ''),
		pbrMetallicRoughness=dict(baseColorTexture=dict(index=tex(texname)), metallicFactor=0.0, roughnessFactor=0.55))
	if texname in normal_for:
		mat['normalTexture'] = dict(index=tex(normal_for[texname]))
	materials.append(mat)
	primitives.append(dict(attributes=attrs, indices=idx, material=len(materials) - 1))

# --- nodes ----------------------------------------------------------------
nodes = []
for j in joints:
	t, r, s = trs(j['local'])
	nodes.append(dict(name=j['name'], translation=t, rotation=r, scale=s))
for i, j in enumerate(joints):
	if j['parent'] >= 0: nodes[j['parent']].setdefault('children', []).append(i)
ibm = []
for j in joints:
	inv = LMatrix4d(j['world']); inv.invert_in_place()
	ibm += [inv.get_cell(r, c) for r in range(4) for c in range(4)]
skin = dict(joints=list(range(len(joints))), inverseBindMatrices=add(ibm, 'f', len(joints), F, 'MAT4'), skeleton=0)
mesh_node = len(nodes)
nodes.append(dict(name='Porygon-Z', mesh=0, skin=0))
roots = [i for i, j in enumerate(joints) if j['parent'] < 0]
scene_root = len(nodes)
nodes.append(dict(name='pm0474_00_root', children=roots + [mesh_node]))

# --- animations -----------------------------------------------------------
def find_tables(node, outmap):
	for child in node.get_children():
		if isinstance(child, (EggXfmSAnim, EggXfmAnimData)):
			outmap[node.get_name()] = child
		elif hasattr(child, 'get_children'):
			find_tables(child, outmap)

uvanims = {}
if os.path.exists(os.path.join(src, 'anims', 'pm0474_00.uvanim')):
	with open(os.path.join(src, 'anims', 'pm0474_00.uvanim')) as f: uvanims['blink'] = json.load(f)
animations = []
for name, stem in anim_args:
	d = read_egg(os.path.join(src, 'anims', stem + '.egg'))
	tables = {}
	find_tables(d, tables)
	fps = None; nframes = 0
	for xf in tables.values():
		fps = xf.get_fps(); nframes = max(nframes, xf.get_num_rows())
	times = [f / fps for f in range(nframes)]
	tacc = add(times, 'f', nframes, F, 'SCALAR', None, ([0.0], [times[-1]]))
	channels, samplers = [], []
	for jname, xf in tables.items():
		if jname not in jindex: continue
		T, R, S = [], [], []
		prev = None
		for f in range(nframes):
			m = LMatrix4d()
			xf.get_value(min(f, xf.get_num_rows() - 1), m)
			t, r, s = trs(m)
			if prev and sum(a * b for a, b in zip(prev, r)) < 0: r = [-x for x in r]
			prev = r
			T += t; R += r; S += s
		for path, data, typ in (('translation', T, 'VEC3'), ('rotation', R, 'VEC4'), ('scale', S, 'VEC3')):
			samplers.append(dict(input=tacc, output=add(data, 'f', nframes, F, typ), interpolation='LINEAR'))
			channels.append(dict(sampler=len(samplers) - 1, target=dict(node=jindex[jname], path=path)))
	anim = dict(name=name, channels=channels, samplers=samplers)
	uv = os.path.join(src, 'anims', stem + '.uvanim')
	if os.path.exists(uv) and os.path.getsize(uv) > 0:
		with open(uv) as f: uvanims[name] = json.load(f)
	animations.append(anim)
	print(name, nframes, 'frames', fps, 'fps', len(channels) // 3, 'joints')

gltf = dict(
	asset=dict(version='2.0', generator='egg2glb', extras=dict(source='Pokémon Sword/Shield pm0474_00 (Porygon-Z)', uv=uvanims)),
	scene=0, scenes=[dict(nodes=[scene_root])], nodes=nodes,
	meshes=[dict(name='Porygon-Z', primitives=primitives)], skins=[skin],
	materials=materials, textures=textures, images=images,
	samplers=[dict(magFilter=9729, minFilter=9987, wrapS=33648, wrapT=10497)],
	accessors=accessors, bufferViews=views, animations=animations,
	buffers=[dict(byteLength=0)],
)
while len(buf) % 4: buf.append(0)
gltf['buffers'][0]['byteLength'] = len(buf)
js = json.dumps(gltf, separators=(',', ':')).encode()
while len(js) % 4: js += b' '
body = struct.pack('<4sII', b'glTF', 2, 12 + 8 + len(js) + 8 + len(buf))
body += struct.pack('<I4s', len(js), b'JSON') + js + struct.pack('<I4s', len(buf), b'BIN\x00') + bytes(buf)
with open(out, 'wb') as f: f.write(body)
print('wrote', out, len(body), 'bytes', len(joints), 'joints', sum(len(c) for c in prims.values()) // 3, 'tris')
