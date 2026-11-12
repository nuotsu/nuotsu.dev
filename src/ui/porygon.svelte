<script lang="ts" module>
	// live instances' teardowns, kept across hot reloads so old renderers get stopped
	const live: Set<() => void> = import.meta.hot
		? (import.meta.hot.data.porygon ??= new Set())
		: new Set()

	import.meta.hot?.dispose(() => {
		for (const stop of [...live]) stop()
	})
</script>

<script lang="ts">
	import { cn } from '#lib/utils.ts'
	import { onMount } from 'svelte'
	import type * as THREE from 'three'
	// imported (not in /static) so the URL is content-hashed and cached immutably
	import modelUrl from '#lib/assets/models/porygon-z.glb?url'
	import { cyberpsychosis } from '#lib/cyberpsychosis.svelte.ts'

	let { class: className = '' }: { class?: string } = $props()

	// the scene is lit dimmer than it's shown so highlights fit an 8-bit target without
	// clipping; the shader's exposure makes up the difference
	const LIGHT = 0.6
	const TIME_LOOP = 20 * Math.PI

	const VERTEX = /* glsl */ `
		void main() {
			gl_Position = vec4(position.xy, 0.0, 1.0);
		}
	`

	// 4× downsample: each bilinear tap averages a 2×2 block, so four of them box-filter 4×4
	const DOWNSAMPLE = /* glsl */ `
		uniform sampler2D tSource;
		uniform vec2 uSize; // output size in px
		uniform vec2 uTexel; // one source texel

		void main() {
			vec2 uv = gl_FragCoord.xy / uSize;
			gl_FragColor = 0.25 * (
				texture2D(tSource, uv + uTexel) + texture2D(tSource, uv - uTexel)
				+ texture2D(tSource, uv + vec2(uTexel.x, -uTexel.y)) + texture2D(tSource, uv + vec2(-uTexel.x, uTexel.y))
			);
		}
	`

	// post-process over the rendered model. Normally a cyan hologram (scanlines, rim light,
	// flicker, the odd glitch tear); during cyberpsychosis a blood-red duotone with a cyan
	// ghost, grain and constant tearing
	const FRAGMENT = /* glsl */ `
		uniform sampler2D tScene; // the model at full resolution
		uniform sampler2D tGlow; // the same, downsampled 16×
		uniform vec2 uRes; // canvas size in device px
		uniform float uDpr;
		uniform float uTime;
		uniform float uGlitch; // 0 at rest, raised while a move plays
		uniform float uPsycho; // 0 hologram → 1 cyberpsychosis

		const vec3 CYAN = vec3(0.369, 0.965, 1.0); // --color-cp-cyan
		const vec3 BLOOD = vec3(0.78, 0.05, 0.07);
		const float EXPOSURE = ${(1.4 / LIGHT).toFixed(4)};

		float hash(vec2 p) {
			return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
		}

		float peak(vec3 c) {
			return max(c.r, max(c.g, c.b));
		}

		// linear premultiplied → display-space color (rgb) and coverage (a)
		vec4 resolve(vec4 s) {
			vec3 c = s.rgb / max(s.a, 0.001);
			return vec4(pow(1.0 - exp(-c * EXPOSURE), vec3(1.0 / 2.2)), s.a);
		}

		vec4 scene(vec2 uv) {
			return resolve(texture2D(tScene, uv));
		}

		// wide soft blur for glow
		vec4 halo(vec2 uv) {
			vec2 o = 8.0 * uDpr / uRes;
			return resolve(0.25 * (
				texture2D(tGlow, uv + o) + texture2D(tGlow, uv - o)
				+ texture2D(tGlow, uv + vec2(o.x, -o.y)) + texture2D(tGlow, uv + vec2(-o.x, o.y))
			));
		}

		// brightness that doesn't punish saturated reds and blues the way luma does
		float value(vec3 c) {
			float v = mix((c.r + c.g + c.b) / 3.0, peak(c), 0.6);
			return smoothstep(0.15, 1.0, v);
		}

		// glitch patches: blocks (size in CSS px) that re-roll rate times a second, with the
		// given share of them live. x: a random -0.5..0.5 inside live patches, y: 1 when live
		vec2 patches(vec2 frag, vec2 size, float rate, float share) {
			vec2 block = floor(frag / (size * uDpr));
			float tick = floor(uTime * rate);
			float live = step(hash(block + tick * 1.7), share);
			return vec2((hash(block.yx - tick * 0.9) - 0.5) * live, live);
		}

		// both looks return premultiplied color; whatever is brighter than its alpha reads as light

		vec4 hologram(vec2 frag, vec2 uv, vec2 px, vec4 glow) {
			vec2 p = patches(frag, vec2(160.0, 6.0), 10.0, 0.004 + uGlitch * 0.5);
			vec4 s = scene(uv + vec2(p.x * 30.0 * px.x, 0.0));
			float l = value(s.rgb);
			float scan = 0.78 + 0.22 * sin(frag.y / uDpr * 2.094 - uTime * 5.0);
			float rim = s.a * (1.0 - glow.a);
			float flicker = 0.9 + 0.1 * step(0.3, hash(vec2(floor(uTime * 20.0), 3.0)));
			float a = s.a * scan * flicker * 0.62;
			vec3 rgb = (mix(s.rgb, CYAN * (0.25 + 0.9 * l), 0.4) + CYAN * rim * 0.9) * a;
			rgb += CYAN * glow.a * (1.0 - 0.7 * s.a) * 0.28 * flicker;
			return vec4(rgb, a);
		}

		vec4 psychosis(vec2 frag, vec2 uv, vec2 px, vec4 glow) {
			vec2 p = patches(frag, vec2(240.0, 5.0), 12.0, 0.1 + uGlitch * 0.5);
			vec2 d = vec2(p.x * 40.0 * px.x, 0.0);
			vec2 split = vec2((4.5 + 1.5 * sin(uTime * 1.3) + 12.0 * uGlitch) * px.x, 0.0);
			vec4 s1 = scene(uv + d + split);
			vec4 s2 = scene(uv + d - split);
			float l = value(s1.rgb);
			// crushed shadows, with only the hottest highlights burning toward orange
			vec3 rgb = (BLOOD * (0.06 + 0.94 * l * l) + vec3(0.25, 0.1, 0.0) * smoothstep(0.75, 1.0, l)) * s1.a;
			rgb += CYAN * value(s2.rgb) * s2.a * 0.22;
			rgb *= 0.85 + 0.25 * hash(frag + fract(uTime) * 61.0);
			rgb *= 0.75 + 0.25 * step(1.0, mod(frag.y / uDpr, 2.0));
			// a slow, uneasy pulse
			float pulse = 0.8 + 0.2 * sin(uTime * 2.4) * sin(uTime * 0.7);
			rgb += BLOOD * glow.a * (1.0 - s1.a) * 0.6 * pulse;
			return vec4(rgb, s1.a);
		}

		void main() {
			vec2 frag = gl_FragCoord.xy;
			vec2 uv = frag / uRes;
			vec2 px = uDpr / uRes; // one CSS px
			vec4 glow = halo(uv);

			vec4 c;
			if (uPsycho <= 0.0) c = hologram(frag, uv, px, glow);
			else if (uPsycho >= 1.0) c = psychosis(frag, uv, px, glow);
			else c = mix(hologram(frag, uv, px, glow), psychosis(frag, uv, px, glow), uPsycho);

			vec3 rgb = min(c.rgb, vec3(1.0));
			gl_FragColor = vec4(rgb, clamp(max(c.a, peak(rgb)), 0.0, 1.0));
		}
	`

	// Porygon-Z (pm0474_00) from Pokémon Sword/Shield, converted to glTF with its
	// battle animations. Tapping plays a random move animation; the head tracks the pointer.
	const MOVES = ['special', 'physical', 'roar', 'land', 'happy', 'hate']

	type UvAnim = {
		fps: number
		num_frames: number
		tracks: Record<string, Record<string, number[]>>
	}

	let canvas: HTMLCanvasElement
	let loaded = $state(false)
	let trigger = () => {}
	let startDrag = (_: PointerEvent) => {}
	let endDrag = () => {}
	let dragged = false // suppresses the tap after a drag

	onMount(() => {
		let disposed = false
		let cleanup = () => {}

		// idempotent: runs on unmount or hot reload
		const stop = () => {
			if (disposed) return
			disposed = true
			live.delete(stop)
			cleanup()
		}
		// stop leftovers from a previous module version
		if (import.meta.hot) for (const prev of [...live]) prev()
		live.add(stop)

		;(async () => {
			// the model downloads (or resolves from the <link rel="preload">) while three.js loads
			const [THREE, { GLTFLoader }, buffer] = await Promise.all([
				import('three'),
				import('three/addons/loaders/GLTFLoader.js'),
				fetch(modelUrl).then((r) => r.arrayBuffer())
			])
			if (disposed) return

			// the canvas only ever shows the post-process pass, so it needs neither MSAA nor a depth buffer
			const renderer = new THREE.WebGLRenderer({
				canvas,
				alpha: true,
				antialias: false,
				depth: false,
				stencil: false,
				powerPreference: 'low-power'
			})
			// replaced by the full teardown below
			cleanup = () => {
				renderer.dispose()
				renderer.forceContextLoss()
			}

			// --- post-process pass ---------------------------------------------
			// the scene renders into a target, which is downsampled twice (4× each) into a small
			// blurred copy for the glow; a fullscreen shader then draws the look from both.
			// Everything is 8-bit sRGB: half the memory traffic of float targets, and no
			// per-frame mipmap generation, which some drivers do slowly
			const target = new THREE.WebGLRenderTarget(1, 1, {
				colorSpace: THREE.SRGBColorSpace,
				samples: 4
			})
			const small = { colorSpace: THREE.SRGBColorSpace, depthBuffer: false }
			const quarter = new THREE.WebGLRenderTarget(1, 1, small)
			const glow = new THREE.WebGLRenderTarget(1, 1, small)

			const downUniforms = {
				tSource: { value: target.texture },
				uSize: { value: new THREE.Vector2(1, 1) },
				uTexel: { value: new THREE.Vector2(1, 1) }
			}
			const pass = { blending: THREE.NoBlending, depthTest: false, depthWrite: false }
			const downsample = new THREE.ShaderMaterial({
				uniforms: downUniforms,
				vertexShader: VERTEX,
				fragmentShader: DOWNSAMPLE,
				...pass
			})

			function downsampleInto(to: THREE.WebGLRenderTarget, from: THREE.WebGLRenderTarget) {
				downUniforms.tSource.value = from.texture
				downUniforms.uSize.value.set(to.width, to.height)
				downUniforms.uTexel.value.set(1 / from.width, 1 / from.height)
				quad.material = downsample
				renderer.setRenderTarget(to)
				renderer.render(quad, quadCamera)
			}

			const uniforms = {
				tScene: { value: target.texture },
				tGlow: { value: glow.texture },
				uRes: { value: new THREE.Vector2(1, 1) },
				uDpr: { value: 1 },
				uTime: { value: 0 },
				uGlitch: { value: 0 },
				uPsycho: { value: cyberpsychosis.active ? 1 : 0 }
			}

			const look = new THREE.ShaderMaterial({
				uniforms,
				vertexShader: VERTEX,
				fragmentShader: FRAGMENT,
				...pass
			})
			const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), look)
			quad.frustumCulled = false
			const quadCamera = new THREE.Camera()
			const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')

			const scene = new THREE.Scene()
			const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 100)
			camera.position.set(0, 0, 4)

			scene.add(new THREE.HemisphereLight(0xffffff, 0x8090a0, 2.4 * LIGHT))
			const key = new THREE.DirectionalLight(0xffffff, 1.6 * LIGHT)
			key.position.set(1.5, 3, 4)
			scene.add(key)
			const rim = new THREE.DirectionalLight(0xbfefff, 1.2 * LIGHT)
			rim.position.set(-3, 1, -2)
			scene.add(rim)

			const gltf = await new GLTFLoader().parseAsync(buffer, '')
			if (disposed) return

			const model = gltf.scene
			const mixer = new THREE.AnimationMixer(model)
			const clips = Object.fromEntries(gltf.animations.map((c) => [c.name, c]))
			const uvAnims: Record<string, UvAnim> = gltf.asset?.extras?.uv ?? {}

			let eyeMap: THREE.Texture | null = null
			model.traverse((o) => {
				if (!(o as THREE.SkinnedMesh).isSkinnedMesh) return
				o.frustumCulled = false
				const mat = (o as THREE.SkinnedMesh).material as THREE.MeshStandardMaterial
				mat.roughness = 0.65
				if (mat.name === 'Eye') eyeMap = mat.map
			})

			const idle = mixer.clipAction(clips.idle)
			idle.play()
			mixer.update(0)

			// normalize size and center on the pivot
			const box = new THREE.Box3().setFromObject(model, true)
			const size = box.getSize(new THREE.Vector3())
			const scale = 1.6 / Math.max(size.x, size.y, size.z)
			model.scale.setScalar(scale)
			model.position.copy(box.getCenter(new THREE.Vector3()).multiplyScalar(-scale))

			// battle animations point the beak sideways; turn the body so the
			// beak faces the camera when the pointer is centered
			const head = model.getObjectByName('Head')!
			const mouth = model.getObjectByName('EffMouth01')!
			model.updateMatrixWorld(true)
			const beak = mouth
				.getWorldPosition(new THREE.Vector3())
				.sub(head.getWorldPosition(new THREE.Vector3()))
			const facing = new THREE.Quaternion().setFromAxisAngle(
				new THREE.Vector3(0, 1, 0),
				-Math.atan2(beak.x, beak.z)
			)
			const body = new THREE.Group()
			body.quaternion.copy(facing)
			body.add(model)
			scene.add(body)

			// eyes are animated by offsetting UVs into the eye texture atlas
			function setEye(anim: UvAnim | undefined, time: number) {
				if (!eyeMap) return
				const track = anim?.tracks.Eye
				const f = anim ? Math.min(Math.floor(time * anim.fps), anim.num_frames - 1) : 0
				// atlas is 2 columns × 4 rows: U = -0.5 picks the (angry) right column,
				// V steps down the rows. Cyberpsychosis pins the eyes to the angry column
				const u = cyberpsychosis.active ? -0.5 : (track?.ColorUVTranslateU?.[f] ?? 0)
				eyeMap.offset.set(-u, track?.ColorUVTranslateV?.[f] ?? 0)
			}

			// --- moves ---------------------------------------------------------
			let current: THREE.AnimationAction | null = null
			let last = ''

			trigger = () => {
				if (current) return
				const options = MOVES.filter((m) => m !== last)
				last = options[Math.floor(Math.random() * options.length)]
				const action = mixer.clipAction(clips[last])
				action.reset().setLoop(THREE.LoopOnce, 1)
				action.clampWhenFinished = true
				action.crossFadeFrom(idle, 0.15, false).play()
				current = action
				if (!reducedMotion.matches) burst = 1
			}

			mixer.addEventListener('finished', ({ action }) => {
				if (action !== current) return
				idle.reset().play()
				idle.crossFadeFrom(action, 0.3, false)
				current = null
			})

			// --- head follows pointer ------------------------------------------
			// the pointer is projected onto a plane in front of the model; the head
			// turns so the beak points at that spot, whichever way the body faces
			const ndc = new THREE.Vector2()
			const pointer = new THREE.Vector3(0, 0, 1.5)
			const raycaster = new THREE.Raycaster()
			const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -1.5) // z = 1.5
			const headPos = new THREE.Vector3()
			const beakDir = new THREE.Vector3()
			const wantDir = new THREE.Vector3(0, 0, 1)
			const lookDir = new THREE.Vector3(0, 0, 1)
			const parentQ = new THREE.Quaternion()
			const toLocal = new THREE.Quaternion()
			const aim = new THREE.Quaternion()
			const delta = new THREE.Quaternion()
			const identity = new THREE.Quaternion()

			// the head may only aim within a cone around the beak's rest direction
			// (in body space), and not too far down, so it never turns into the body
			const CONE = THREE.MathUtils.degToRad(65)
			const MIN_Y = -0.35 // lowest allowed downward component of the aim
			const forward = beak.clone().normalize()
			const bodyInv = new THREE.Quaternion()
			const local = new THREE.Vector3()
			const coneQ = new THREE.Quaternion()
			function clampToCone(dir: THREE.Vector3) {
				bodyInv.copy(body.quaternion).invert()
				local.copy(dir).applyQuaternion(bodyInv)
				const angle = local.angleTo(forward)
				if (angle > CONE) {
					coneQ.setFromUnitVectors(forward, local).slerp(identity, 1 - CONE / angle)
					local.copy(forward).applyQuaternion(coneQ)
				}
				if (local.y < MIN_Y) {
					const h = Math.hypot(local.x, local.z) || 1
					const k = Math.sqrt(1 - MIN_Y * MIN_Y) / h
					local.set(local.x * k, MIN_Y, local.z * k)
				}
				return dir.copy(local).applyQuaternion(body.quaternion)
			}
			let lookWeight = 1

			function onpointermove(e: PointerEvent) {
				const r = canvas.getBoundingClientRect()
				ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
				raycaster.setFromCamera(ndc, camera)
				raycaster.ray.intersectPlane(plane, pointer)
				onDrag(e)
			}
			addEventListener('pointermove', onpointermove, { passive: true })
			addEventListener('pointerdown', onpointermove, { passive: true })

			// block pinch-zoom over the model: trackpad pinch (ctrl+wheel) and Safari gestures
			const block = (e: Event) => e.preventDefault()
			const onwheel = (e: WheelEvent) => e.ctrlKey && e.preventDefault()
			canvas.addEventListener('wheel', onwheel, { passive: false })
			canvas.addEventListener('gesturestart', block)
			canvas.addEventListener('gesturechange', block)

			// --- drag to rotate the body ---------------------------------------
			// trackball-style: horizontal drag spins around Y, vertical around X.
			// Springs back to `facing` after RETURN_DELAY seconds without dragging.
			const RETURN_DELAY = 3
			const spin = new THREE.Quaternion()
			const step = new THREE.Quaternion()
			const euler = new THREE.Euler()
			let dragging: { x: number; y: number; moved: number } | null = null
			let sinceDrag = Infinity

			function onDrag(e: PointerEvent) {
				if (!dragging) return
				const dx = e.clientX - dragging.x
				const dy = e.clientY - dragging.y
				dragging.x = e.clientX
				dragging.y = e.clientY
				dragging.moved += Math.abs(dx) + Math.abs(dy)
				if (dragging.moved > 6) dragged = true
				const k = (Math.PI * 2) / canvas.clientHeight
				spin.premultiply(step.setFromEuler(euler.set(dy * k, dx * k, 0))).normalize()
			}
			startDrag = (e) => {
				dragged = false
				dragging = { x: e.clientX, y: e.clientY, moved: 0 }
				sinceDrag = 0
			}
			endDrag = () => {
				dragging = null
				sinceDrag = 0
			}

			// --- loop ----------------------------------------------------------
			const clock = new THREE.Clock()
			let idleTime = 0
			let burst = 0
			let sustain = 0
			let wasPsycho = cyberpsychosis.active

			function loop() {
				if (disposed) return renderer.setAnimationLoop(null)
				const dt = Math.min(clock.getDelta(), 0.1)
				mixer.update(dt)

				if (current) {
					setEye(uvAnims[last], current.time)
				} else {
					idleTime += dt
					const blink = uvAnims.blink
					setEye(blink, blink ? idleTime % (blink.num_frames / blink.fps) : 0)
				}

				const ease = 1 - Math.exp(-dt * 6)

				if (!dragging) {
					sinceDrag += dt
					if (sinceDrag > RETURN_DELAY) spin.slerp(identity, 1 - Math.exp(-dt * 3))
				}
				body.quaternion.multiplyQuaternions(spin, facing)

				// rotate the animated head so the beak aims at the pointer
				// (eased off during moves so the attack animation still reads)
				body.updateMatrixWorld(true)
				head.getWorldPosition(headPos)
				beakDir.copy(mouth.getWorldPosition(beakDir)).sub(headPos).normalize()
				clampToCone(wantDir.copy(pointer).sub(headPos).normalize())
				lookDir.lerp(wantDir, ease).normalize()
				lookWeight += ((current ? 0.4 : 1) - lookWeight) * ease

				aim.setFromUnitVectors(beakDir, lookDir)
				delta.slerpQuaternions(identity, aim, lookWeight)
				head.parent!.getWorldQuaternion(parentQ)
				head.quaternion.premultiply(
					toLocal.copy(parentQ).invert().multiply(delta).multiply(parentQ)
				)

				// wrapped so hash() keeps its float precision; every wave (5, 1.3, 2.4, 0.7 rad/s) loops on 20π
				uniforms.uTime.value = (uniforms.uTime.value + dt) % TIME_LOOP

				// glitch: a sharp burst when a move starts or cyberpsychosis flips, then a
				// sustained level for as long as the move plays
				const psycho = cyberpsychosis.active
				if (psycho !== wasPsycho && !reducedMotion.matches) burst = 1
				wasPsycho = psycho
				burst *= Math.exp(-dt * 5)
				sustain += ((current && !reducedMotion.matches ? 0.4 : 0) - sustain) * ease
				uniforms.uGlitch.value = Math.max(burst, sustain)

				const blend =
					uniforms.uPsycho.value + ((psycho ? 1 : 0) - uniforms.uPsycho.value) * ease * 1.5
				uniforms.uPsycho.value =
					Math.abs((psycho ? 1 : 0) - blend) < 0.004 ? (psycho ? 1 : 0) : blend

				renderer.setRenderTarget(target)
				renderer.render(scene, camera)
				downsampleInto(quarter, target)
				downsampleInto(glow, quarter)
				quad.material = look
				renderer.setRenderTarget(null)
				renderer.render(quad, quadCamera)
			}

			function resize() {
				const { clientWidth: w, clientHeight: h } = canvas
				if (!w || !h) return
				const dpr = Math.min(devicePixelRatio, 2)
				renderer.setPixelRatio(dpr)
				renderer.setSize(w, h, false)

				const { width, height } = renderer.domElement
				target.setSize(width, height)
				quarter.setSize(Math.ceil(width / 4), Math.ceil(height / 4))
				glow.setSize(Math.ceil(width / 16), Math.ceil(height / 16))
				uniforms.uRes.value.set(width, height)
				uniforms.uDpr.value = dpr

				camera.aspect = w / h
				camera.updateProjectionMatrix()
			}

			// only render while on screen
			const io = new IntersectionObserver(([entry]) => {
				if (disposed) return
				clock.getDelta()
				renderer.setAnimationLoop(entry.isIntersecting ? loop : null)
			})

			const ro = new ResizeObserver(resize)
			ro.observe(canvas)
			resize()

			cleanup = () => {
				io.disconnect()
				ro.disconnect()
				removeEventListener('pointermove', onpointermove)
				removeEventListener('pointerdown', onpointermove)
				canvas.removeEventListener('wheel', onwheel)
				canvas.removeEventListener('gesturestart', block)
				canvas.removeEventListener('gesturechange', block)
				renderer.setAnimationLoop(null)
				mixer.stopAllAction()
				scene.traverse((o) => {
					const m = o as THREE.Mesh
					m.geometry?.dispose()
					const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : []
					for (const mat of mats) {
						for (const v of Object.values(mat))
							if ((v as THREE.Texture)?.isTexture) (v as THREE.Texture).dispose()
						mat.dispose()
					}
				})
				target.dispose()
				quarter.dispose()
				glow.dispose()
				quad.geometry.dispose()
				look.dispose()
				downsample.dispose()
				renderer.dispose()
				// free the GL context immediately
				renderer.forceContextLoss()
			}

			// compile shaders off the main thread before the first frame, so the reveal doesn't hitch
			// (the model's programs depend on where they draw, so compile them against the target)
			renderer.setRenderTarget(target)
			const compiling = [renderer.compileAsync(scene, camera)]
			quad.material = downsample
			compiling.push(renderer.compileAsync(quad, quadCamera))
			renderer.setRenderTarget(null)
			quad.material = look
			compiling.push(renderer.compileAsync(quad, quadCamera))
			await Promise.all(compiling)
			if (disposed) return
			io.observe(canvas)
			loaded = true
		})()

		return stop
	})
</script>

<svelte:head>
	<!-- starts the download with the HTML, long before hydration; low priority since it's decorative -->
	<link
		rel="preload"
		href={modelUrl}
		as="fetch"
		type="model/gltf-binary"
		crossorigin="anonymous"
		fetchpriority="low"
	/>
</svelte:head>

<section class={cn('relative full-bleed h-[min(18rem,75cqw)] overflow-clip', className)}>
	<button
		type="button"
		class="size-full touch-none select-none"
		aria-label="Porygon-Z. Tap to use a random move, drag to rotate"
		data-cursor="false"
		onpointerdown={(e) => {
			e.currentTarget.setPointerCapture(e.pointerId)
			startDrag(e)
		}}
		onpointerup={() => endDrag()}
		onpointercancel={() => endDrag()}
		onclick={() => !dragged && trigger()}
	>
		<!-- only as wide as the model needs, not the full bleed: fewer pixels to shade, and less
		     of the page to recomposite every frame. The button around it still takes input -->
		<canvas
			bind:this={canvas}
			class="mx-auto block h-full max-w-full transition-opacity duration-500"
			style:aspect-ratio="3 / 2"
			class:opacity-0={!loaded}
		></canvas>
	</button>
</section>
