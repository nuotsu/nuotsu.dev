<h1>nuotsu</h1>

<ul>
	{#each works as work}
		<li>
			<LicensePlate {work} />
		</li>
	{/each}
</ul>

<script>
	import LicensePlate from '$lib/LicensePlate.svelte'

	export let data

	const { works } = data
</script>
