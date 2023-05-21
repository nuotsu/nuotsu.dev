<div class="overflow-x-auto">
	<svg
		class="w-full"
		style:min-width={fftSize / 2}
		width={fftSize/2}
		height={height}
		viewBox="0 0 {fftSize / 2} {height}"
		preserveAspectRatio="xMidYMin slice"
	>
		{#each bars as bar, i}
			<line x1={i} x2={i} y1={height} y2={height - bar - offset} stroke="currentColor" stroke-width={1} />
		{/each}
	</svg>
</div>

<Fader label="Smoothing" max={1} bind:value={smoothingTimeConstant} step={0.01} />
<Fader label="FFT" max={fftSizes.length - 1} bind:value={fftSizeIndex} output={fftSize} />
<Fader label="Max (dB)" min={-150} max={0} bind:value={maxDecibels} />
<Fader label="Min (dB)" min={-1000} max={0} bind:value={minDecibels} />
<Fader label="offset" min={height * -1} max={height} bind:value={offset} />

<script lang="ts">
	import { analyzer } from '$lib/AudioAnalyzer.svelte'
	import { fftSizes } from '$types/AudioAnalysis'
	import { onMount } from 'svelte'
	import Fader from './Fader.svelte'

	let bars: number[] = []
	const height = 255

	let smoothingTimeConstant = 0.8
	let fftSizeIndex = 5
	$: fftSize = fftSizes[fftSizeIndex]
	let maxDecibels = -30
	let minDecibels = -350
	let offset = 0

	let interval = setInterval(() => {
		if (!$analyzer) return []

		$analyzer.fftSize = fftSize
		$analyzer.maxDecibels = maxDecibels
		$analyzer.minDecibels = minDecibels
		$analyzer.smoothingTimeConstant = smoothingTimeConstant

		const dataArray = new Uint8Array($analyzer.frequencyBinCount)
		$analyzer.getByteFrequencyData(dataArray)

		bars = Array.from(dataArray)
	}, 20)

	onMount(() => {
		return () => {
			clearInterval(interval)
		}
	})
</script>
