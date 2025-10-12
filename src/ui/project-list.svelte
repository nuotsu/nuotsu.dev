<script lang="ts">
	import getUrl from '$lib/get-url'
	import Section from './section.svelte'
	import { cn } from '$lib/utils'
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
		<h2
			class="sticky -left-ch bg-foreground text-background not-first:ml-lh md:left-0"
		>
			{heading} ({projects.length})
		</h2>

		<ul class="flex">
			{#each projects as { featured, ...project }}
				{@const hasLink = project.url && !project.redacted}

				<li
					class={cn(
						'shrink-0 overflow-hidden border-t overflow-ellipsis',
						featured && 'has-[a]:border-blue-300 has-[a:hover]:border-blue-500',
						!hasLink && 'text-current/50',
					)}
				>
					{#if hasLink}
						<a
							class={cn(
								'flex',
								featured
									? 'gap-ch bg-linear-to-t from-blue-500/25 not-hover:text-blue-300 hover:bg-blue-500'
									: 'hover:bg-foreground/20',
							)}
							class:featured
							href={project.url}
						>
							<span class="grow overflow-hidden overflow-ellipsis">
								{getProjectUrl(project)}
							</span>
						</a>
					{:else}
						{getProjectUrl(project)}
					{/if}
				</li>
			{/each}
		</ul>
	</article>
{/snippet}

<Section heading="Projects">
	<div
		class="no-scrollbar flex gap-lh overflow-x-auto mask-r-from-[calc(100%-1ch)] pr-ch whitespace-nowrap max-md:full-bleed max-md:px-ch"
	>
		{@render list(
			'Personal',
			projectsSorted.filter((p) => !p.isClient),
		)}
		{@render list(
			'Client',
			projectsSorted.filter((p) => p.isClient),
		)}
	</div>
</Section>

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

	.featured::after {
		content: '+';
		margin-left: auto;
		flex-shrink: 0;
	}
</style>
