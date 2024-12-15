<header class="mx-auto flex max-w-lg justify-between gap-x-2 p-2 text-sm">
	<div class="flex gap-x-2">
		<h1 class="font-black text-[dodgerblue]">nuotsu.dev</h1>
		<p class="italic">I make websites.</p>
	</div>

	<nav class="flex justify-end *:px-1 hover:*:not-hover:opacity-50">
		<a href="https://github.com/nuotsu">GitHub</a>
		<a href="https://linkedin.com/in/nuotsu">LinkedIn</a>
		<a href="mailto:mitchell@nuotsu.dev">Email</a>
		<a href="https://x.com/marutchell">X</a>
	</nav>
</header>

<section class="mx-auto max-w-lg p-2">
	{#each data.projects as project}
		<article>
			<a
				class="group flex items-center gap-x-4 border-b border-neutral-800 py-1 visited:text-purple-400 hover:border-amber-400/40"
				href={project.url}
			>
				<div class="flex items-center gap-2 group-hover:text-amber-400">
					<h2 class="line-clamp-1">{project.title}</h2>

					{#if project.repo}
						<div class="flex gap-1 text-xs">
							<GitHubStars repo={project.repo} />
						</div>
					{/if}
				</div>

				<div
					class="autoboy group-hover:text-ink ml-auto flex shrink-0 items-center justify-end gap-2 text-[xx-small]"
				>
					<span class="opacity-70">{project.japanese}</span>

					{#if project.startDate}
						<time class="flex" datetime={project.startDate}>
							<i
								>&rsquo;{formatDate(project.startDate, {
									year: '2-digit',
								})}年</i
							>
							<i>{formatDate(project.startDate, { month: 'numeric' })}月</i>
							<i>{formatDate(project.startDate, { day: 'numeric' })}日</i>
						</time>
					{/if}
				</div>
			</a>
		</article>
	{/each}
</section>

<script lang="ts">
	import GitHubStars from './GitHubStars.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	function formatDate(date: string, options: Intl.DateTimeFormatOptions) {
		const { format } = new Intl.DateTimeFormat('en-US', options)
		return format(new Date(date + 'T00:00:00')).padStart(2, ' ')
	}
</script>
