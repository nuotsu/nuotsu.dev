<ul class="text-ink/90 space-y-2 landscape:pl-[env(safe-area-inset-left)]">
	{#each projects as project}
		<li>
			<a href={project.url} class="inline-flex items-center gap-3">
				<span>{project.title}</span>

				{#if project.repo}
					{@const { stargazers, forks } = project}

					{#if stargazers || forks}
						<small class="text-[x-small]">
							{#if stargazers}
								<span>★{stargazers}</span>
							{/if}

							{#if forks}
								<span>⑂{forks}</span>
							{/if}
						</small>
					{/if}
				{/if}
			</a>
		</li>
	{/each}
</ul>

<script lang="ts">
	let { projects }: { projects: Sanity.Project[] } = $props()
</script>
