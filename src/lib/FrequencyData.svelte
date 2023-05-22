<details open={controls}>
	<summary class="block overflow-x-auto">
		<svg
			class="w-full"
			style:min-width={fftSize / 2}
			width={fftSize/2}
			height={height}
			viewBox="0 0 {fftSize / 2} {height}"
			preserveAspectRatio="xMidYMin slice"
		>
			<polyline points={points} fill="none" stroke="currentColor" />
		</svg>
	</summary>

	<Fader label="Smoothing" max={1} bind:value={smoothingTimeConstant} step={0.01} />
	<Fader label="FFT" max={fftSizes.length - 1} bind:value={fftSizeIndex} output={fftSize} />
	<Fader label="Max (dB)" min={-150} max={0} bind:value={maxDecibels} />
	<Fader label="Min (dB)" min={-1000} max={0} bind:value={minDecibels} />
	<Fader label="Offset" min={height * -1} max={height} bind:value={offset} />
	<Fader label="Height" max={400} bind:value={height} />
</details>

<style>
	summary::-webkit-details-marker {
		display: none;
	}
</style>

<script lang="ts">
	import { analyzer } from './AudioAnalyzer.svelte'
	import { fftSizes } from '$types/AudioAnalysis'
	import { onMount } from 'svelte'
	import Fader from './Fader.svelte'

	let data: number[] = []

	export let smoothingTimeConstant = 0.8,
		fftSizeIndex = 6,
		maxDecibels = -30,
		minDecibels = -100,
		offset = 0,
		height = 255,
		controls = false

	$: fftSize = fftSizes[fftSizeIndex]

	let interval = setInterval(() => {
		if (!$analyzer) return []

		$analyzer.fftSize = fftSize
		$analyzer.maxDecibels = maxDecibels
		$analyzer.minDecibels = minDecibels
		$analyzer.smoothingTimeConstant = smoothingTimeConstant

		const dataArray = new Uint8Array($analyzer.frequencyBinCount)
		$analyzer.getByteFrequencyData(dataArray)

		data = Array.from(dataArray)
	}, 20)

	$: points = data.map((d, i) => `${i},${height - d - offset}`).join(' ')

	onMount(() => {
		return () => {
			clearInterval(interval)
		}
	})
</script>
