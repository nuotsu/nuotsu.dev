<table>
	<thead>
		<tr>
			<th class="w-full text-left">Project</th>
			<th class="px-[1ch]">Stars</th>
			<th>Forks</th>
		</tr>
	</thead>

	<tbody>
		{#each projects as project}
			{@const { stargazers, forks } = project}

			<tr class="hover:bg-ink hover:text-canvas">
				<td class="line-clamp-1">
					<a href={project.url}>
						{project.title}
					</a>
				</td>

				<td class="px-[1ch] text-right">
					{#if stargazers}{stargazers}{/if}
				</td>

				<td class="text-right">
					{#if forks}{forks}{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<script lang="ts">
	let { projects }: { projects: Sanity.Project[] } = $props()
</script>
