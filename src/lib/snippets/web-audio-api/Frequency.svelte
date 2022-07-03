<canvas bind:this={canvas} />

<script>
	import { onMount } from 'svelte'
	import { analyzer } from './AudioAnalyzer.svelte'

	let canvas, frame

	function loop() {
		frame = requestAnimationFrame(loop)

		if (!$analyzer || !canvas) return

		const ctx = canvas.getContext('2d')

		const dataArray = new Uint8Array($analyzer.frequencyBinCount)
		$analyzer.getByteFrequencyData(dataArray)

		ctx.clearRect(0, 0, canvas.width, canvas.height)
		ctx.fillStyle = '#000'

		for (let i = 0; i < 100; i++) {
			ctx.fillRect(i * 3, canvas.height, 2, -(dataArray[i] / 2))
		}
	}

	onMount(() => {
		loop()

		return () => cancelAnimationFrame(frame)
	})
</script>
