<h1>nuotsu</h1>

<ul>
	{#each works as work}
		<li>
			<a href={work.url} target="_blank" rel="noreferrer">
				{work.title}
			</a>
		</li>
	{/each}
</ul>

<script>
	export let data

	const { works } = data
</script>
