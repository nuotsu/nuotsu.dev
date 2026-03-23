<script lang="ts">
	async function fetchVisitorCount() {
		const response = await fetch('/api/views')
		return response.json()
	}
</script>

<p>
	Visitors:
	{#await fetchVisitorCount() then { views }}
		{new Intl.NumberFormat().format(views)}
	{/await}
</p>
