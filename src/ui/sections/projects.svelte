<script lang="ts">
	import { other } from '$lib/constants'
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
					<span class="line-clamp-1 grow break-all">{title}</span>

					{#if client}
						<small class="text-current/25 lowercase">Client</small>
					{/if}

					{#if repo}
						<GitHub {repo} />
					{/if}
				</a>
			</li>
		{/each}
	</ul>

	<SourceCode file="src/ui/sections/projects.svelte" lines={23} />
</section>
