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
				<tr data-year={year} {onmouseenter}>
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

<style>
	:global(body:has(tr[data-year='2025']:hover) #archive li:not([data-year='2025'])),
	:global(body:has(tr[data-year='2024']:hover) #archive li:not([data-year='2024'])),
	:global(body:has(tr[data-year='2023']:hover) #archive li:not([data-year='2023'])),
	:global(body:has(tr[data-year='2022']:hover) #archive li:not([data-year='2022'])),
	:global(body:has(tr[data-year='2021']:hover) #archive li:not([data-year='2021'])),
	:global(body:has(tr[data-year='2020']:hover) #archive li:not([data-year='2020'])),
	:global(body:has(tr[data-year='2017']:hover) #archive li:not([data-year='2017'])),
	:global(body:has(tr[data-year='1995']:hover) #archive li:not([data-year='1995'])) {
		font-weight: normal;
		opacity: 0.5;
	}
</style>

<script lang="ts">
	let { projects }: { projects: Sanity.Project[] } = $props()

	const byYear = projects.reduce<Record<number, number>>((acc, project) => {
		const year = new Date(project.startDate).getFullYear()
		acc[year] = (acc[year] || 0) + 1
		return acc
	}, {})

	const sortByYear = Object.entries(byYear).reverse()

	function onmouseenter(e: MouseEvent) {
		const year = (e.target as HTMLElement)?.closest('tr')?.dataset.year
		document.querySelector(`#archive li[data-year="${year}"]`)?.scrollIntoView({
			behavior: 'smooth',
		})
	}
</script>
