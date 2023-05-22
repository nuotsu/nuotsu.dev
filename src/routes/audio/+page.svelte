<AudioAnalyzer autoRequest>
	<FrequencyData
		fftSizeIndex={5}
		minDecibels={-350}
		controls
	/>
	<p slot="unsupported">Audio not supported</p>
</AudioAnalyzer>

<AudioAnalyzer autoRequest>
	<TimeDomainData/>
	<p slot="unsupported">Audio not supported</p>
</AudioAnalyzer>

<script lang="ts">
	import AudioAnalyzer from '$lib/AudioAnalyzer.svelte'
	import FrequencyData from '$lib/FrequencyData.svelte'
	import TimeDomainData from '$lib/TimeDomainData.svelte'
</script>
