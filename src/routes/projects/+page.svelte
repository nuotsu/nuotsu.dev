<script lang="ts">
	import { projects } from '$lib/constants'
	import { count } from '$lib/utils'

	async function getGitHub(repo: string) {
		const response = await fetch(`/api/github?repo=${repo}`)
		return response.json()
	}
</script>

<section class="section">
	<h2 class="sr-only">Projects</h2>

	<ul class="unordered-list">
		{#each projects as project}
			<li>
				<a class="flex flex-wrap gap-x-ch" href={project.href}>
					<span class="link">
						{project.title}

						{#if project.year}
							({project.year})
						{/if}
					</span>

					{#if project.repo}
						{#await getGitHub(project.repo) then { stars, forks }}
							<span class="text-subdued transition-opacity starting:opacity-0">
								{[stars && count(stars, 'star'), forks && count(forks, 'fork')]
									.filter(Boolean)
									.join(', ')}
							</span>
						{/await}
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</section>
