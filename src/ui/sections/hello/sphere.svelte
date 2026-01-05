<script lang="ts">
	let { words = [], height = 280 } = $props()

	interface Point3D {
		x: number
		y: number
		z: number
		word: string
	}

	let canvas: HTMLCanvasElement
	let ctx: CanvasRenderingContext2D
	let points: Point3D[] = []
	let rotationX = 0
	let rotationY = 0
	let autoRotateX = 0.002
	let autoRotateY = 0.003
	let isDragging = false
	let lastMouseX = 0
	let lastMouseY = 0
	let logicalWidth = 0

	const radius = 100

	// Fibonacci sphere algorithm for even distribution
	function createSpherePoints() {
		points = []
		const goldenRatio = (1 + Math.sqrt(5)) / 2
		const angleIncrement = Math.PI * 2 * goldenRatio

		words.forEach((word, i) => {
			const t = i / words.length
			const inclination = Math.acos(1 - 2 * t)
			const azimuth = angleIncrement * i

			const x = radius * Math.sin(inclination) * Math.cos(azimuth)
			const y = radius * Math.sin(inclination) * Math.sin(azimuth)
			const z = radius * Math.cos(inclination)

			points.push({ x, y, z, word })
		})
	}

	function rotatePoint(point: Point3D, angleX: number, angleY: number) {
		// Rotate around X axis
		let y = point.y * Math.cos(angleX) - point.z * Math.sin(angleX)
		let z = point.y * Math.sin(angleX) + point.z * Math.cos(angleX)

		// Rotate around Y axis
		const x = point.x * Math.cos(angleY) - z * Math.sin(angleY)
		z = point.x * Math.sin(angleY) + z * Math.cos(angleY)

		return { x, y, z, word: point.word }
	}

	function project(point: Point3D) {
		const perspective = 600
		const scale = perspective / (perspective + point.z)
		return {
			x: point.x * scale + logicalWidth / 2,
			y: point.y * scale + height / 2,
			scale,
			z: point.z,
		}
	}

	function render() {
		if (!ctx || !canvas) return

		ctx.clearRect(0, 0, logicalWidth, height)

		// Rotate and project all points
		const rotatedPoints = points.map((point) => {
			const rotated = rotatePoint(point, rotationX, rotationY)
			const projected = project(rotated)
			return { ...rotated, ...projected }
		})

		// Sort by z-index (back to front)
		rotatedPoints.sort((a, b) => a.z - b.z)

		// Draw words
		rotatedPoints.forEach((point) => {
			// Calculate opacity based on z position (closer = more visible)
			const opacity = Math.max(0, (point.z + radius) / (radius * 2))

			// Scale based on perspective
			const fontSize = Math.max(12, 16 * point.scale)

			ctx.font = `${fontSize}px 'Geist', sans-serif`
			ctx.textAlign = 'center'
			ctx.textBaseline = 'middle'
			ctx.fillStyle = `rgba(0, 0, 0, ${1 - opacity})`

			ctx.fillText(point.word, point.x, point.y)
		})

		// Continue rotation if not dragging
		if (!isDragging) {
			rotationX += autoRotateX
			rotationY += autoRotateY
		}

		requestAnimationFrame(render)
	}

	function handleMouseDown(e: MouseEvent) {
		isDragging = true
		lastMouseX = e.clientX
		lastMouseY = e.clientY

		// Add window listeners for mousemove and mouseup to track dragging outside canvas
		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('mouseup', handleMouseUp)
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDragging) return

		const deltaX = e.clientX - lastMouseX
		const deltaY = e.clientY - lastMouseY

		rotationY += deltaX * 0.005
		rotationX += deltaY * 0.005

		lastMouseX = e.clientX
		lastMouseY = e.clientY
	}

	function handleMouseUp() {
		isDragging = false
	}

	function handleTouchStart(e: TouchEvent) {
		e.preventDefault()
		const touch = e.touches[0]
		isDragging = true
		lastMouseX = touch.clientX
		lastMouseY = touch.clientY
	}

	function handleTouchMove(e: TouchEvent) {
		e.preventDefault()
		if (!isDragging) return

		const touch = e.touches[0]
		const deltaX = touch.clientX - lastMouseX
		const deltaY = touch.clientY - lastMouseY

		rotationY += deltaX * 0.005
		rotationX += deltaY * 0.005

		lastMouseX = touch.clientX
		lastMouseY = touch.clientY
	}

	function handleTouchEnd(e: TouchEvent) {
		e.preventDefault()
		isDragging = false
	}

	function resizeCanvas() {
		if (!canvas || !ctx) return

		const dpr = window.devicePixelRatio || 1
		logicalWidth = canvas.clientWidth
		height = height

		// Set actual canvas size accounting for device pixel ratio
		canvas.width = logicalWidth * dpr
		canvas.height = height * dpr

		// Reset transform and scale context to match device pixel ratio
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
		class="w-full cursor-grab touch-none active:cursor-grabbing"
		onmousedown={handleMouseDown}
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
		ontouchend={handleTouchEnd}
	>
	</canvas>
</div>
