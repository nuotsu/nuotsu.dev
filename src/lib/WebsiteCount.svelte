<article class="sticky top-0 z-1 ml-auto">
	<table>
		<thead>
			<tr>
				<th>Year</th>
				<th>Websites</th>
			</tr>
		</thead>
		<tbody>
			{#each sortByYear as [year, count]}
				<tr>
					<td>{year}</td>
					<td class="text-right">{count}</td>
				</tr>
			{/each}

			<tr>
				<td>Total</td>
				<td class="text-right">{projects.length}+</td>
			</tr>
		</tbody>
	</table>
</article>

<script lang="ts">
	let { projects }: { projects: Sanity.Project[] } = $props()

	const byYear = projects.reduce<Record<number, number>>((acc, project) => {
		const year = new Date(project.startDate).getFullYear()
		acc[year] = (acc[year] || 0) + 1
		return acc
	}, {})

	const sortByYear = Object.entries(byYear).reverse()
</script>
