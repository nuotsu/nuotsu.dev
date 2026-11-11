<script lang="ts">
	import { cn } from '#lib/utils.ts'
	import { onMount } from 'svelte'
	import type * as THREE from 'three'

	let { class: className = '' }: { class?: string } = $props()

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

		;(async () => {
			const THREE = await import('three')
			const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js')
			if (disposed) return

			const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
			renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
			renderer.outputColorSpace = THREE.SRGBColorSpace
			renderer.toneMapping = THREE.NeutralToneMapping

			const scene = new THREE.Scene()
			const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 100)
			camera.position.set(0, 0, 4)

			scene.add(new THREE.HemisphereLight(0xffffff, 0x8090a0, 2.4))
			const key = new THREE.DirectionalLight(0xffffff, 1.6)
			key.position.set(1.5, 3, 4)
			scene.add(key)
			const rim = new THREE.DirectionalLight(0xbfefff, 1.2)
			rim.position.set(-3, 1, -2)
			scene.add(rim)

			const gltf = await new GLTFLoader().loadAsync('/models/porygon-z.glb')
			if (disposed) return renderer.dispose()

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
				// V steps down the rows
				eyeMap.offset.set(-(track?.ColorUVTranslateU?.[f] ?? 0), track?.ColorUVTranslateV?.[f] ?? 0)
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

			function loop() {
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
				head.quaternion.premultiply(parentQ.clone().invert().multiply(delta).multiply(parentQ))

				renderer.render(scene, camera)
			}

			function resize() {
				const { clientWidth: w, clientHeight: h } = canvas
				renderer.setSize(w, h, false)
				camera.aspect = w / h
				camera.updateProjectionMatrix()
			}

			// only render while on screen
			const io = new IntersectionObserver(([entry]) => {
				clock.getDelta()
				renderer.setAnimationLoop(entry.isIntersecting ? loop : null)
			})
			io.observe(canvas)

			const ro = new ResizeObserver(resize)
			ro.observe(canvas)
			resize()
			loaded = true

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
				renderer.dispose()
			}
		})()

		return () => {
			disposed = true
			cleanup()
		}
	})
</script>

<section
	class={cn('relative mx-[calc(50%-50vw)] h-[min(24rem,100vw)] w-screen overflow-clip', className)}
>
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
		<canvas
			bind:this={canvas}
			class="size-full transition-opacity duration-500"
			class:opacity-0={!loaded}
		></canvas>
	</button>
</section>
