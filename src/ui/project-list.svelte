<script lang="ts">
	import getUrl from '$lib/get-url'
	import type { LAYOUT_QUERYResult, Project } from '@/sanity/types'

	let { projects }: { projects: LAYOUT_QUERYResult['projects'] } = $props()

	const projectsSorted = $derived(
		projects.sort((a, b) => {
			const aUrl = getProjectUrl(a)
			const bUrl = getProjectUrl(b)
			return aUrl!.localeCompare(bUrl!)
		}),
	)

	function getProjectUrl(project: Project) {
		const url = getUrl(project.url!)

		return project.redacted ? url?.replace(/(?<=\b[A-Za-z]+)[a-z]/g, '*') : url
	}
</script>

{#snippet list(heading: string, projects: Project[])}
	<article class="flex shrink-0">
		<h2 class="sticky -left-ch bg-foreground text-background not-first:ml-lh">
			{heading}
		</h2>

		<ul class="flex">
			{#each projects as project}
				<li
					class="shrink-0 overflow-hidden border-t overflow-ellipsis has-[a]:border-blue-300 has-[a:hover]:border-blue-500"
				>
					{#if project.featured}
						<a
							class="flex gap-ch bg-linear-to-t from-blue-500/25 not-hover:text-blue-300 hover:bg-blue-500"
							href={project.url}
						>
							<span class="grow overflow-hidden overflow-ellipsis"
								>{getProjectUrl(project)}</span
							>
						</a>
					{:else}
						{getProjectUrl(project)}
					{/if}
				</li>
			{/each}
		</ul>
	</article>
{/snippet}

<section
	class="no-scrollbar flex gap-lh overflow-x-auto mask-r-from-[calc(100%-1ch)] whitespace-nowrap max-md:full-bleed max-md:px-ch"
>
	{@render list(
		'Personal projects',
		projectsSorted.filter((p) => !p.isClient),
	)}
	{@render list(
		'Client projects',
		projectsSorted.filter((p) => p.isClient),
	)}
</section>

<style>
	li:not(:has(a)),
	h2,
	a {
		padding-inline: 0.5ch;
	}

	li,
	h2 {
		writing-mode: vertical-rl;
		max-height: 30ch;
	}

	a::after {
		content: '+';
		margin-left: auto;
		flex-shrink: 0;
	}
</style>
