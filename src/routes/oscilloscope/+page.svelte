<FrequencyViz
	svgClassName="mx-auto"
	minDecibels={-350}
	offset={-100}
	open
/>

<TimeDomainViz svgClassName="mx-auto" open />

<script lang="ts">
	import FrequencyViz from '$lib/audio/FrequencyViz.svelte'
	import TimeDomainViz from '$lib/audio/TimeDomainViz.svelte'
</script>
