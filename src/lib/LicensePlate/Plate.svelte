<figure>
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
		aspect-ratio: 1.8;
		margin: auto;
		text-align: center;
		overflow: hidden;

		@apply bg-white rounded-lg shadow-lg;
	}
</style>

<script>
	import Japan from './Japan.svelte'
	import California from './California.svelte'

	export let work
</script>
