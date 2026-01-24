<script lang="ts">
	let { words = [], height = 280 } = $props()

	interface Point3D {
		x: number
		y: number
		z: number
		word: string
	}

	interface ProjectedPoint extends Point3D {
		scale: number
	}

	type Vector2D = { x: number; y: number }

	let canvas: HTMLCanvasElement
	let ctx: CanvasRenderingContext2D
	let points: Point3D[] = []
	let logicalWidth = 0

	// Rotation state
	let rotation: Vector2D = {
		x: Math.random() * Math.PI * 2,
		y: Math.random() * Math.PI * 2,
	}
	const autoRotate: Vector2D = { x: 0.002, y: 0.003 }

	// Interaction state
	let isDragging = false
	let lastPointer: Vector2D = { x: 0, y: 0 }
	let velocity: Vector2D = { x: 0, y: 0 }
	let lastMoveTime = 0

	// Constants
	const radius = 100
	const perspective = 600
	const rotationSensitivity = 0.005
	const friction = 0.95
	const minVelocity = 0.001
	const targetFPS = 60
	const frameTime = 1000 / targetFPS
	const minFontSize = 12
	const baseFontSize = 16

	function createSpherePoint(
		word: string,
		index: number,
		total: number,
	): Point3D {
		const goldenRatio = (1 + Math.sqrt(5)) / 2
		const t = index / total
		const inclination = Math.acos(1 - 2 * t)
		const azimuth = Math.PI * 2 * goldenRatio * index

		return {
			x: radius * Math.sin(inclination) * Math.cos(azimuth),
			y: radius * Math.sin(inclination) * Math.sin(azimuth),
			z: radius * Math.cos(inclination),
			word,
		}
	}

	function createSpherePoints() {
		points = words.map((word, i) => createSpherePoint(word, i, words.length))
	}

	function rotatePoint(point: Point3D, rotation: Vector2D): Point3D {
		// Rotate around X axis
		let y = point.y * Math.cos(rotation.x) - point.z * Math.sin(rotation.x)
		let z = point.y * Math.sin(rotation.x) + point.z * Math.cos(rotation.x)

		// Rotate around Y axis
		const x = point.x * Math.cos(rotation.y) - z * Math.sin(rotation.y)
		z = point.x * Math.sin(rotation.y) + z * Math.cos(rotation.y)

		return { x, y, z, word: point.word }
	}

	function project(point: Point3D): ProjectedPoint {
		const scale = perspective / (perspective + point.z)
		return {
			...point,
			x: point.x * scale + logicalWidth / 2,
			y: point.y * scale + height / 2,
			scale,
		}
	}

	function render() {
		if (!ctx || !canvas) return

		ctx.clearRect(0, 0, logicalWidth, height)

		// Rotate and project all points
		const rotatedPoints = points
			.map((point) => rotatePoint(point, rotation))
			.map((point) => project(point))

		// Sort by z-index (back to front)
		rotatedPoints.sort((a, b) => a.z - b.z)

		// Draw words
		rotatedPoints.forEach((point) => drawWord(ctx, point))

		// Apply momentum or auto-rotation
		if (!isDragging) {
			updateRotation()
		}

		requestAnimationFrame(render)
	}

	function onpointerdown(e: PointerEvent) {
		e.preventDefault()
		isDragging = true
		lastPointer = { x: e.clientX, y: e.clientY }
		velocity = { x: 0, y: 0 }
		lastMoveTime = performance.now()
		canvas.setPointerCapture(e.pointerId)
	}

	function onpointermove(e: PointerEvent) {
		if (!isDragging) return

		const currentTime = performance.now()
		const deltaTime = currentTime - lastMoveTime || frameTime
		const delta: Vector2D = {
			x: e.clientX - lastPointer.x,
			y: e.clientY - lastPointer.y,
		}

		// Apply rotation (swap x/y for natural feel)
		const rotationDelta: Vector2D = {
			x: delta.y * rotationSensitivity,
			y: delta.x * rotationSensitivity,
		}
		rotation.x += rotationDelta.x
		rotation.y += rotationDelta.y

		// Calculate velocity (normalized by time for consistent momentum)
		const timeScale = deltaTime / frameTime
		velocity = {
			x: rotationDelta.y / timeScale,
			y: rotationDelta.x / timeScale,
		}

		lastPointer = { x: e.clientX, y: e.clientY }
		lastMoveTime = currentTime
	}

	function onpointerup(e: PointerEvent) {
		isDragging = false
		canvas.releasePointerCapture(e.pointerId)
	}

	function drawWord(ctx: CanvasRenderingContext2D, point: ProjectedPoint) {
		const opacity = Math.max(0, (point.z + radius) / (radius * 2))
		const fontSize = Math.max(minFontSize, baseFontSize * point.scale)

		ctx.font = `${fontSize}px 'Mozilla Headline', sans-serif`
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillStyle = `rgba(0, 0, 0, ${1 - opacity})`
		ctx.fillText(point.word, point.x, point.y)
	}

	function hasMomentum(v: Vector2D): boolean {
		return Math.abs(v.x) > minVelocity || Math.abs(v.y) > minVelocity
	}

	function applyFriction(v: Vector2D): Vector2D {
		return {
			x: Math.abs(v.x) < minVelocity ? 0 : v.x * friction,
			y: Math.abs(v.y) < minVelocity ? 0 : v.y * friction,
		}
	}

	function updateRotation() {
		if (hasMomentum(velocity)) {
			rotation.y += velocity.x
			rotation.x += velocity.y
			velocity = applyFriction(velocity)
		} else {
			rotation.x += autoRotate.x
			rotation.y += autoRotate.y
		}
	}

	function resizeCanvas() {
		if (!canvas || !ctx) return

		const dpr = window.devicePixelRatio || 1
		logicalWidth = canvas.clientWidth

		canvas.width = logicalWidth * dpr
		canvas.height = height * dpr

		ctx.setTransform(1, 0, 0, 1, 0, 0)
		ctx.scale(dpr, dpr)
	}

	$effect(() => {
		ctx = canvas.getContext('2d')!
		resizeCanvas()
		createSpherePoints()
		render()
	})
</script>

<svelte:window onresize={resizeCanvas} />

<div class="overflow-hidden" style:max-height={height}>
	<canvas
		bind:this={canvas}
		style:height="{height}px"
		class="w-full cursor-crosshair touch-none"
		{onpointerdown}
		{onpointermove}
		{onpointerup}
	>
		<ul>
			{#each words as word}
				<li>{word}</li>
			{/each}
		</ul>
	</canvas>
</div>
