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
	<h2 class="sticky -left-ch bg-foreground text-background not-first:ml-lh">
		{heading}
	</h2>

	<ul class="flex">
		{#each projects as project}
			<li class="shrink-0 overflow-hidden overflow-ellipsis">
				{getProjectUrl(project)}
			</li>
		{/each}
	</ul>
{/snippet}

<section
	class="no-scrollbar full-bleed flex overflow-x-auto px-ch whitespace-nowrap"
>
	{@render list(
		'My work',
		projectsSorted.filter((p) => !p.isClient),
	)}
	{@render list(
		'Client work',
		projectsSorted.filter((p) => p.isClient),
	)}
</section>

<style>
	li,
	h2 {
		padding-inline: 0.5ch;
		writing-mode: vertical-rl;
		max-height: 30ch;
	}
</style>
