<div class="grid place-content-center]" style:min-height="{height}px">
	{#if enabled}
		<div class="flex flex-wrap items-center justify-center gap-8" transition:fade>
			<FrequencyViz controls={false}
				svgClassName="mx-auto"
				fftSizeIndex={4}
				minDecibels={-480}
				offset={-150}
				{height}
			/>

			<TimeDomainViz controls={false}
				svgClassName="mx-auto"
				fftSizeIndex={4}
				{height}
			/>
		</div>

	{:else}
		<div class="grid place-content-center" transition:fade>
			<button
				class="action"
				on:click={() => enabled = true}
			>
				Get lit <span class="bg-accent bg-clip-text text-transparent">🔥</span>
			</button>
		</div>
	{/if}
</div>

<style>
	.grid > :global(*) {
		grid-column: 1 / -1;
		grid-row: 1 / -1;
	}
</style>

<script lang="ts">
	import { fade } from 'svelte/transition'
	import FrequencyViz from '$lib/audio/FrequencyViz.svelte'
	import TimeDomainViz from '$lib/audio/TimeDomainViz.svelte'

	let enabled = false

	const height = 100
</script>
