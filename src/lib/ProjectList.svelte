<section>
	<table>
		<thead>
			<tr>
				<th>Project</th>
				<th>Stars</th>
				<th>Forks</th>
			</tr>
		</thead>

		<tbody>
			{#each processedProjects as project}
				{@const { stargazers, forks } = project}

				<tr>
					<td class="line-clamp-1">
						<a href={project.url}>
							{project.title}
						</a>
					</td>

					<td class="text-right">
						{#if stargazers}{stargazers}{/if}
					</td>

					<td class="text-right">
						{#if forks}{forks}{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<style>
	th {
		position: sticky;
		top: 1lh;

		@media (orientation: landscape) and (hover: none) and (width < 64rem) {
			top: 0;
		}
	}
</style>

<script lang="ts">
	let { projects }: { projects: Sanity.Project[] } = $props()

	const processedProjects = projects
		.filter((p) => p.featured)
		.sort((a, b) => (b?.stargazers || 0) - (a?.stargazers || 0))
</script>
