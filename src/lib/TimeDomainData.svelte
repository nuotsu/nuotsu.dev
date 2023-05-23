<AudioAnalyzer {analyzer} {autoRequest}>
	<details open={controls}>
		<summary class="overflow-x-auto">
			<svg
				class={svgClassName}
				style:min-width={fftSize / 2}
				width={fftSize / 2}
				height={height}
				viewBox="0 0 {fftSize / 2} {height}"
				preserveAspectRatio={scale ? 'xMidYMin slice' : null}
			>
				<polyline points={points} fill="none" stroke="currentColor" />
			</svg>
		</summary>

		<Toggle label="Scale" bind:checked={scale} />
		<Fader label="FFT" max={fftSizes.length - 1} bind:value={fftSizeIndex} output={fftSize} />
		{#if scale}
			<Fader label="Offset" min={height * -1} max={height} bind:value={offset} />
		{/if}
		<Fader label="Height" max={1000} bind:value={height} />
		<Fader label="Factor" min={0.05} max={10} bind:value={factor} step={0.05} />
	</details>
</AudioAnalyzer>

<script lang="ts">
	import AudioAnalyzer from './AudioAnalyzer.svelte'
	import Toggle from './Toggle.svelte'
	import Fader from './Fader.svelte'
	import { fftSizes } from '$types/AudioAnalysis'
	import { onMount } from 'svelte'
	import { writable } from 'svelte/store'

	export let
		analyzer: AudioAnalysis.Analyzer = writable(null),
		autoRequest: boolean = false

	export let
		svgClassName: string | null = null,
		controls: boolean = false,
		scale: boolean = false,
		fftSizeIndex = 6,
		height = 255,
		factor = 1,
		offset = 0

	$: fftSize = fftSizes[fftSizeIndex]

	let data: number[] = []

	let interval = setInterval(() => {
		if (!$analyzer) return []

		$analyzer.fftSize = fftSize

		const dataArray = new Uint8Array($analyzer.frequencyBinCount)
		$analyzer.getByteTimeDomainData(dataArray)

		data = Array.from(dataArray)
	}, 20)

	$: points = data.map((d, i) => `${i},${height/2 + (height/255 * d - height/2) * factor - (scale ? offset : 0)}`).join(' ')

	onMount(() => {
		return () => {
			clearInterval(interval)
		}
	})
</script>
