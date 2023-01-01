<figure data-type={type} bind:this={plate}>
	{#if type.includes('jp')}
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
		width: 12em;
		text-align: center;
		overflow: hidden;
		color: #1f2a64;

		@apply bg-white rounded-lg shadow-lg;
	}

	[data-type="ca-legacy"] {
		background-color: #000;
		color: #f1c839;
	}

	[data-type*="jp"] {
		color: #094500;
	}
</style>

<script>
	import VanillaTilt from 'vanilla-tilt'
	import Japan from './Japan.svelte'
	import California from './California.svelte'

	export let work

	const type = work.plate.type

	let plate

	$: if (plate) VanillaTilt.init(plate, {
		reverse: true,
		glare: true,
		'max-glare': .5,
	})
</script>
