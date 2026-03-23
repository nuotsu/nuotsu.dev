<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'

	let { class: className }: HTMLAttributes<HTMLCanvasElement> = $props()

	type Puff = { cx: number; cy: number; r: number }
	type Cloud = {
		x: number // canvas px
		y: number
		puffs: Puff[] // in char-cell units, relative to cloud origin
		w: number // bounding box width in chars
		h: number // bounding box height in chars
		speed: number // px/s
		seed: number
		t: number
	}

	// sparse → dense, round/fluffy feel
	const CHARS = ['.', "'", ')', '(', 'c', 'o', 'C', '0', 'O', '@']
	const FONT_SIZE = 11
	const FONT = `${FONT_SIZE}px monospace`

	let canvas = $state<HTMLCanvasElement>()

	function rand(min: number, max: number) {
		return Math.random() * (max - min) + min
	}

	function makeCloud(x: number, canvasH: number, charH: number): Cloud {
		const numBumps = Math.floor(rand(3, 6))
		const bumpR = rand(3.5, 6.5)
		const spacing = bumpR * 1.6
		const totalW = numBumps * spacing + bumpR
		const totalH = bumpR * 2.2

		const puffs: Puff[] = []

		// wide base body — centre sits at ~55% so the clip cuts across its flat equator
		puffs.push({ cx: totalW / 2, cy: totalH * 0.55, r: totalW * 0.4 })

		// bumps across the top
		for (let i = 0; i < numBumps; i++) {
			const r = rand(bumpR * 0.7, bumpR * 1.15)
			const cx = bumpR * 0.5 + (i + 0.5) * spacing + rand(-r * 0.25, r * 0.25)
			const cy = totalH * rand(0.18, 0.42)
			puffs.push({ cx, cy, r })
		}

		// visible height = bounding box * clip fraction; keep 1lh safe area at bottom
		const visibleH = Math.ceil(totalH) * 0.6 * charH
		const maxY = Math.max(0, canvasH - charH - visibleH)

		return {
			x,
			y: rand(0, maxY),
			puffs,
			w: Math.ceil(totalW),
			h: Math.ceil(totalH),
			speed: rand(10, 24),
			seed: rand(0, 100),
			t: rand(0, Math.PI * 2)
		}
	}

	function cloudDensity(col: number, row: number, cloud: Cloud): number {
		// metaball sum from all puffs
		let d = 0
		for (const p of cloud.puffs) {
			const dx = col - p.cx
			const dy = (row - p.cy) * 1.2 // slight vertical squeeze → rounder
			const dist = Math.sqrt(dx * dx + dy * dy)
			d += Math.max(0, 1 - dist / p.r)
		}

		// hard flat bottom — anything below the midline is cut
		if (row > cloud.h * 0.6) return 0

		// slow noise for gradual shape morphing
		d +=
			Math.sin(col * 0.52 + cloud.seed + cloud.t) *
			Math.cos(row * 0.78 + cloud.seed * 1.3 + cloud.t * 0.65) *
			0.14

		return d
	}

	$effect(() => {
		if (!canvas) return

		const ctx = canvas.getContext('2d')!
		let clouds: Cloud[] = []
		let rafId: number
		let lastTime = 0
		let charW = 0
		const charH = FONT_SIZE * 1.2

		function measure() {
			ctx.font = FONT
			charW = ctx.measureText('M').width
		}

		function resize() {
			const dpr = window.devicePixelRatio || 1
			const w = canvas!.clientWidth
			const h = canvas!.clientHeight
			canvas!.width = w * dpr
			canvas!.height = h * dpr
			ctx.scale(dpr, dpr)
			measure()
		}

		function spawnInitial() {
			clouds = Array.from({ length: 6 }, () =>
				makeCloud(rand(0, canvas!.clientWidth), canvas!.clientHeight, charH)
			)
		}

		function frame(now: number) {
			const dt = Math.min((now - lastTime) / 1000, 0.1)
			lastTime = now

			const w = canvas!.clientWidth
			const h = canvas!.clientHeight

			ctx.fillStyle = getComputedStyle(canvas!).getPropertyValue('--color-sky') || '#0156cb'
			ctx.fillRect(0, 0, w, h)

			ctx.font = FONT
			ctx.fillStyle = 'rgba(255,255,255,0.5)'
			ctx.textBaseline = 'top'

			for (const cloud of clouds) {
				cloud.x -= cloud.speed * dt
				cloud.t += 0.003

				const cloudPxW = cloud.w * charW
				if (cloud.x + cloudPxW < 0) {
					Object.assign(cloud, makeCloud(w + rand(0, w * 0.5), h, charH))
				}

				for (let row = 0; row < cloud.h; row++) {
					for (let col = 0; col < cloud.w; col++) {
						const d = cloudDensity(col, row, cloud)
						if (d < 0.1) continue
						const idx = Math.min(CHARS.length - 1, Math.floor(d * 0.65 * CHARS.length))
						ctx.fillText(CHARS[idx], cloud.x + col * charW, cloud.y + row * charH)
					}
				}
			}

			rafId = requestAnimationFrame(frame)
		}

		const ro = new ResizeObserver(() => resize())
		ro.observe(canvas)
		resize()
		spawnInitial()
		rafId = requestAnimationFrame((t) => {
			lastTime = t
			frame(t)
		})

		return () => {
			cancelAnimationFrame(rafId)
			ro.disconnect()
		}
	})
</script>

<canvas class="block w-full {className}" bind:this={canvas}></canvas>
