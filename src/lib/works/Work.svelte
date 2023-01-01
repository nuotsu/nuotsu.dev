<li>
	<a href={work.url} target="_blank" rel="noreferrer">
		{#if work.plate}
			<div>
				<LicensePlate {work} />
			</div>
		{/if}

		<p>{work.title}</p>
	</a>
</li>

<style>
	a {
		display: grid;
		gap: 1rem;
	}

	a:hover {
		position: relative;
		z-index: 1;
	}

	a:hover p {
		text-decoration: dashed underline;
	}

	div :global(figure) {
		@apply transition-shadow duration-500;
	}

	div:hover :global(figure) {
		animation: hang .6s ease-in-out 1.8s forwards;
		@apply shadow-2xl;
	}

	@keyframes hang {
		from { transform-origin: 1rem 1rem; }
		to { transform-origin: 1rem 1rem; }
		0% { transform: rotate(0); }
		50% { transform: rotate(70deg); }
		80% { transform: rotate(58deg); }
		100% { transform: rotate(62deg); }
	}
</style>

<script>
	import LicensePlate from '../LicensePlate/Plate.svelte'

	export let work
</script>
