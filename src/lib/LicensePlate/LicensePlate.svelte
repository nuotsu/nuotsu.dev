<figure data-plate={work.plate.type}>
	{#if work.plate.type.includes('jp')}
		<Japan {work} />
	{:else}
		<California {work} />
	{/if}
</figure>

<style>
	figure {
		display: flex;
		flex-direction: column;
		aspect-ratio: 2;
		max-width: 12em;
		text-align: center;

		@apply rounded shadow;
	}
</style>

<script>
	import Japan from './Japan.svelte'
	import California from './California.svelte'

	export let work
</script>
