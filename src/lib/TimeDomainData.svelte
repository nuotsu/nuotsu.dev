<svg
	class="min-w-full mx-auto"
	style:min-width={2048 / 2}
	width={2048 / 2}
	height={255}
	viewBox="0 0 {2048 / 2} {255}"
	preserveAspectRatio="xMidYMin slice"
>
	<polyline points={points} fill="none" stroke="currentColor" />
</svg>

<script lang="ts">
	import { analyzer } from './AudioAnalyzer.svelte'
	import { onMount } from 'svelte'

	let data: number[] = []

	let interval = setInterval(() => {
		if (!$analyzer) return []

		const dataArray = new Uint8Array($analyzer.frequencyBinCount)
		$analyzer.getByteTimeDomainData(dataArray)

		data = Array.from(dataArray)
	}, 20)

	$: points = data.map((d, i) => `${i},${d}`).join(' ')

	onMount(() => {
		return () => {
			clearInterval(interval)
		}
	})
</script>
