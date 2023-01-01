<h1>nuotsu</h1>

<ul>
	{#each works as work}
		<li>
			{#if work.plate}
				<LicensePlate {work} />
			{/if}

			<a href={work.url} target="_blank" rel="noreferrer">
				{work.title}
			</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
		gap: 1rem;
		padding-inline: 1rem;
		text-align: center;
	}
</style>

<script>
	import LicensePlate from '$lib/LicensePlate/Plate.svelte'

	export let data

	const { works } = data
</script>
