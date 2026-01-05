<script lang="ts">
	import { other } from '$lib/projects'
	import GitHub from '$ui/github.svelte'
	import Headline from '$ui/headline.svelte'
	import SourceCode from '$ui/source-code.svelte'
</script>

<section>
	<Headline>Projects</Headline>

	<ul>
		{#each other as { title, href, repo, client }}
			<li class="relative">
				<a class="flex items-center gap-ch" {href}>
					<span class="line-clamp-1 break-all">{title}</span>

					{#if client}
						<small class="text-current/50 lowercase">Client</small>
					{/if}

					{#if repo}
						<GitHub {repo} class="ml-auto" />
					{/if}

					<span class="absolute inset-0 text-transparent"></span>
				</a>
			</li>
		{/each}
	</ul>

	<SourceCode file="src/ui/sections/projects.svelte" />
</section>
