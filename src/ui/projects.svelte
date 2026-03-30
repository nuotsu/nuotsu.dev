<script lang="ts">
	import { projects } from '$lib/constants'
	import { count } from '$lib/utils'

	async function fetchGitHub(repo: string) {
		const response = await fetch(`/api/github?repo=${repo}`)
		return response.json()
	}
</script>

<section id="projects" class="space-y-lh">
	<h2>Projects</h2>

	<h3 class="text-current/50">Personal Side Quests</h3>
	<ul class="anchored-indicator hover-list">
		{#each projects.filter((p) => !p.client) as { title, href, year, repo }}
			<li>
				<a class="flex gap-ch" {href}>
					<span class="line-clamp-1 break-all">{title}</span>
					{#if year}<time class="text-current/50" datetime={year.toString()}>{year}</time>{/if}

					{#if repo}
						<span class="ml-auto flex shrink-0 gap-ch">
							{#await fetchGitHub(repo)}
								<loading></loading>
							{:then data}
								{#each ['forks', 'stars'] as key}
									{#if data[key]}
										<span
											class="transition-opacity starting:opacity-0"
											title={count(data[key], key.slice(0, -1))}
										>
											<abbr class="text-current/50" title={key}>{key.charAt(0)}</abbr>{data[key]}
										</span>
									{/if}
								{/each}
							{/await}
						</span>
					{/if}
				</a>
			</li>
		{/each}
	</ul>

	<h3 class="h3 text-current/50">Client Websites</h3>
	<ul class="anchored-indicator hover-list">
		{#each projects.filter((p) => p.client) as { title, href, label }}
			<li>
				<a class="flex gap-ch" {href}>
					{title}
					{#if label}<span class="line-clamp-1 break-all text-current/50">{label}</span>{/if}
				</a>
			</li>
		{/each}
	</ul>
</section>
