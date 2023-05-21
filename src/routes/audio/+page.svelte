<AudioAnalyzer autoRequest>
	<FrequencyData
		fftSizeIndex={5}
		minDecibels={-350}
	/>

	<p slot="unsupported">Audio not supported</p>
</AudioAnalyzer>

<script lang="ts">
	import AudioAnalyzer from '$lib/AudioAnalyzer.svelte'
	import FrequencyData from '$lib/FrequencyData.svelte'
</script>
