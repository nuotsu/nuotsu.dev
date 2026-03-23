<script lang="ts">
	import { SvelteMap } from 'svelte/reactivity'
	import type { HTMLAttributes } from 'svelte/elements'

	let { class: className }: HTMLAttributes<HTMLCanvasElement> = $props()
	let canvas: HTMLCanvasElement | undefined = $state()

	interface Cloud {
		x: number
		y: number
		cols: number
		rows: number
		speed: number
		seed: number
		t: number
	}

	interface CharVec {
		char: string
		vec: number[]
	}

	// ─── Math ─────────────────────────────────────────────────

	function smoothstep(a: number, b: number, x: number): number {
		const t = Math.max(0, Math.min(1, (x - a) / (b - a)))
		return t * t * (3 - 2 * t)
	}

	// ─── Noise ────────────────────────────────────────────────

	// 4-octave fractal Brownian motion over normalised [0,1] coords
	function fbm(nx: number, ny: number, seed: number, t: number): number {
		let v = 0, amp = 1, freq = 3.0, total = 0
		for (let i = 0; i < 4; i++) {
			const px = nx * freq + seed * (i * 3.7 + 1.1) + t * 0.07
			const py = ny * freq * 1.3 + seed * (i * 2.1 + 0.9) + t * 0.05
			v += amp * (Math.sin(px) * Math.cos(py) * 0.5 + 0.5)
			total += amp
			amp *= 0.5
			freq *= 2.1
		}
		return v / total
	}

	// ─── Character shape matching ─────────────────────────────

	// 6 sampling circles per cell: [UL, UR, ML, MR, LL, LR]
	const SAMPLES: [number, number][] = [
		[0.25, 0.25], [0.75, 0.25],
		[0.25, 0.5 ], [0.75, 0.5 ],
		[0.25, 0.75], [0.75, 0.75],
	]

	const CHARS = " .,'`:;-_~^!|/\\()+*=csznuoOCG08&@#%WM"
	const GAMMA = 2.2

	function enhance(vec: number[]): number[] {
		const m = Math.max(...vec, 1e-9)
		return vec.map(v => Math.pow(v / m, GAMMA) * m)
	}

	function buildCharDB(fontSize: number, cw: number, ch: number): CharVec[] {
		const W = Math.ceil(cw), H = Math.ceil(ch)
		const off = document.createElement('canvas')
		off.width = W; off.height = H
		const ctx = off.getContext('2d')!
		ctx.font = `${fontSize}px monospace`
		ctx.textBaseline = 'top'
		const r = Math.min(W, H) * 0.2

		return [...CHARS].map(char => {
			ctx.clearRect(0, 0, W, H)
			ctx.fillStyle = 'white'
			ctx.fillText(char, 0, 0)
			const px = ctx.getImageData(0, 0, W, H)

			const raw = SAMPLES.map(([sx, sy]) => {
				const cx = sx * W, cy = sy * H
				let sum = 0, n = 0
				for (let py = Math.max(0, Math.floor(cy - r)); py < Math.min(H, Math.ceil(cy + r)); py++) {
					for (let px2 = Math.max(0, Math.floor(cx - r)); px2 < Math.min(W, Math.ceil(cx + r)); px2++) {
						const dx = px2 + 0.5 - cx, dy = py + 0.5 - cy
						if (dx * dx + dy * dy <= r * r) {
							sum += px.data[(py * W + px2) * 4 + 3] / 255
							n++
						}
					}
				}
				return n > 0 ? sum / n : 0
			})

			return { char, vec: enhance(raw) }
		})
	}

	function quantize(vec: number[]): number {
		let k = 0
		for (let i = 0; i < 6; i++) k |= Math.min(15, Math.floor(vec[i] * 16)) << (i * 4)
		return k
	}

	function matchChar(vec: number[], db: CharVec[], cache: Map<number, string>): string {
		const key = quantize(vec)
		const hit = cache.get(key)
		if (hit !== undefined) return hit

		const ev = enhance(vec)
		let best = ' ', bestD = Infinity
		for (const e of db) {
			let d = 0
			for (let i = 0; i < 6; i++) { const diff = ev[i] - e.vec[i]; d += diff * diff }
			if (d < bestD) { bestD = d; best = e.char }
		}
		cache.set(key, best)
		return best
	}

	// ─── Cloud coverage ───────────────────────────────────────

	function cellCoverage(cloud: Cloud, localRow: number, localCol: number): number[] {
		return SAMPLES.map(([sx, sy]) => {
			// Hard flat-bottom clip
			if (localRow + sy >= cloud.rows * 0.78) return 0

			const nx = (localCol + sx) / cloud.cols
			const ny = (localRow + sy) / cloud.rows

			// Soft elliptical envelope, shifted up so clip falls at the equator
			const ex = (nx - 0.5) * 2
			const ey = (ny - 0.3) * 2.5
			const env = Math.max(0, 1 - (ex * ex + ey * ey))

			// FBM density modulated by envelope
			const n = fbm(nx, ny, cloud.seed, cloud.t)
			const density = env * Math.pow(n, 0.65)

			return smoothstep(0.15, 0.55, density)
		})
	}

	// ─── Spawn / collision ────────────────────────────────────

	function overlaps(clouds: Cloud[], x: number, y: number, cols: number, rows: number): boolean {
		for (const a of clouds) {
			const ax1 = Math.floor(a.x), ax2 = ax1 + a.cols
			if (ax1 < x + cols + 3 && ax2 + 3 > x && a.y < y + rows + 1 && a.y + a.rows + 1 > y) return true
		}
		return false
	}

	// ─── Color ────────────────────────────────────────────────

	function parseColor(s: string): [number, number, number] | null {
		const hex = s.match(/^#([0-9a-f]{3,6})$/i)
		if (hex) {
			const h = hex[1]
			if (h.length === 3) return [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)]
			return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
		}
		const m = s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
		if (m) return [+m[1], +m[2], +m[3]]
		return null
	}

	// ─── Main effect ──────────────────────────────────────────

	$effect(() => {
		if (!canvas) return

		const FONT_SIZE = 12
		const FONT = `${FONT_SIZE}px monospace`
		const SPAWN_MIN = 3, SPAWN_MAX = 6

		let clouds: Cloud[] = []
		let charDB: CharVec[] = []
		let matchCache = new SvelteMap<number, string>()
		let charW = 0, charH = 0
		let gridCols = 0, gridRows = 0
		let animId = 0, lastTime = 0
		let spawnTimer = 0
		let nextSpawnIn = SPAWN_MIN + Math.random() * (SPAWN_MAX - SPAWN_MIN)
		let running = true

		function setupGrid() {
			const dpr = window.devicePixelRatio || 1
			const rect = canvas!.getBoundingClientRect()
			if (!rect.width || !rect.height) return
			canvas!.width = rect.width * dpr
			canvas!.height = rect.height * dpr
			const ctx = canvas!.getContext('2d')!
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
			ctx.font = FONT
			charW = ctx.measureText('@').width
			charH = FONT_SIZE * 1.4
			gridCols = Math.floor(rect.width / charW)
			gridRows = Math.floor(rect.height / charH)
			charDB = buildCharDB(FONT_SIZE, charW, charH)
			matchCache.clear()
		}

		function makeCloud(startX?: number): Cloud | null {
			if (!gridCols || !gridRows) return null
			const cols = 14 + Math.floor(Math.random() * 26)
			const rows = 5 + Math.floor(Math.random() * 4)
			const x = startX ?? gridCols
			for (let attempt = 0; attempt < 12; attempt++) {
				const y = Math.floor(Math.random() * Math.max(1, gridRows - rows - 1))
				if (!overlaps(clouds, x, y, cols, rows)) {
					return {
						x, y, cols, rows,
						speed: 0.4 + Math.random(),
						seed: Math.random() * 100,
						t: Math.random() * 100,
					}
				}
			}
			return null
		}

		setupGrid()
		for (let i = 0; i < 4; i++) {
			const c = makeCloud(Math.floor((i / 4) * gridCols))
			if (c) clouds.push(c)
		}

		const ro = new ResizeObserver(() => {
			setupGrid()
			clouds = clouds.filter(c => c.y < gridRows && c.x + c.cols > 0)
		})
		ro.observe(canvas!)

		function loop(time: number) {
			if (!running || !canvas) return
			const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.1) : 0
			lastTime = time

			for (const c of clouds) {
				c.x -= c.speed * dt
				c.t += dt * 0.06
			}
			clouds = clouds.filter(c => c.x + c.cols > 0)

			spawnTimer += dt
			if (spawnTimer >= nextSpawnIn) {
				spawnTimer = 0
				nextSpawnIn = SPAWN_MIN + Math.random() * (SPAWN_MAX - SPAWN_MIN)
				const c = makeCloud()
				if (c) clouds.push(c)
			}

			const rect = canvas.getBoundingClientRect()
			const ctx = canvas.getContext('2d')!
			const style = getComputedStyle(canvas)
			const skyColor = style.getPropertyValue('--color-sky').trim() || '#0156cb'
			const fg = parseColor(style.color)
			const cloudColor = fg ? `rgba(${fg[0]},${fg[1]},${fg[2]},0.5)` : 'rgba(255,255,255,0.5)'

			ctx.fillStyle = skyColor
			ctx.fillRect(0, 0, rect.width, rect.height)
			ctx.font = FONT
			ctx.textBaseline = 'top'
			ctx.fillStyle = cloudColor

			if (charDB.length) {
				for (const cloud of clouds) {
					const cx = Math.floor(cloud.x)
					for (let r = 0; r < cloud.rows; r++) {
						for (let c = 0; c < cloud.cols; c++) {
							const px = cx + c
							if (px < 0 || px * charW > rect.width) continue
							const cov = cellCoverage(cloud, r, c)
							const ch = matchChar(cov, charDB, matchCache)
							if (ch !== ' ') ctx.fillText(ch, px * charW, (cloud.y + r) * charH)
						}
					}
				}
			}

			animId = requestAnimationFrame(loop)
		}

		animId = requestAnimationFrame(loop)

		return () => {
			running = false
			cancelAnimationFrame(animId)
			ro.disconnect()
		}
	})
</script>

<canvas class="block w-full {className}" bind:this={canvas}></canvas>
