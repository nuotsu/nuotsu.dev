<script lang="ts">
	import { projects } from '$lib/constants'

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
				<a class="group/p flex gap-ch" {href}>
					<span class="line-clamp-1 break-all">{title}</span>
					{#if year}<time class="text-current/50" datetime={year.toString()}>{year}</time>{/if}

					{#if repo}
						<span class="ml-auto shrink-0">
							{#await fetchGitHub(repo)}
								<loading></loading>
							{:then { stars, forks }}
								<span class="transition-opacity group-not-hover/p:grayscale starting:opacity-0">
									{[forks && `🍴${forks}`, stars && `⭐️${stars}`].filter(Boolean).join(' ')}
								</span>
							{/await}
						</span>
					{/if}
				</a>
			</li>
		{/each}
	</ul>

	<h3 class="h3 text-current/50">Client Work</h3>
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
