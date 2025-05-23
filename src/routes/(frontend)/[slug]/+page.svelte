<script lang="ts">
	import Img from '@/ui/Img.svelte'
	import type { PageData } from './$types'
	import { urlFor } from '$lib/sanity/image'

	let { data }: { data: PageData } = $props()
</script>

<svelte:head>
	<title>{data.project.metadata?.title}</title>
	<meta name="description" content={data.project.metadata?.description} />
	{#if data.project.screenshot}
		<link rel="preload" href={urlFor(data.project.screenshot).auto('format').url()} as="image" />
	{/if}
</svelte:head>

<Img
	class="fixed inset-0 -z-1 size-full object-cover text-[0px] dark:opacity-50"
	image={data.project.screenshot}
	loading="eager"
	draggable={false}
	alt={data.project.metadata?.title}
/>

<article class="*:bg-bg flex max-w-prose flex-col items-start *:px-[.5ch]">
	<h1 class="font-normal">
		<em class="font-bold">{data.project.metadata?.title}</em>

		{#if data.project.date}
			{@const { format } = new Intl.DateTimeFormat('en-US', {
				year: 'numeric',
				month: 'long',
			})}

			<time datetime={data.project.date}>({format(new Date(data.project.date + 'T00:00:00'))})</time
			>
		{/if}
	</h1>

	<p>{data.project.metadata?.description}</p>

	<nav class="gap-x-ch flex flex-wrap">
		{#if data.project.url}
			<a href={data.project.url}>Visit {data.project.url.replace(/^https?:\/\//, '')}</a>
		{/if}
		{#if data.project.repo}
			<a href="https://github.com/{data.project.repo}">View on GitHub</a>
		{/if}
	</nav>
</article>
