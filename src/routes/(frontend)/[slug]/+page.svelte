<script lang="ts">
	import Img from '@/ui/Img.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
	let { url, date, screenshots, metadata } = $derived(data.project)
</script>

<svelte:head>
	<title>{metadata?.title} // nuotsu</title>
	<meta name="description" content={metadata?.description} />
</svelte:head>

<header class="prose min-h-[8lh] flex-col justify-end max-sm:flex">
	<h1>
		<i>{metadata?.title}</i>

		{#if date}
			<time datetime={date}>
				({new Date(date + 'T00:00:00').getFullYear()})
			</time>
		{/if}
	</h1>

	<p>{metadata?.description}</p>
</header>

<section class="space-y-lh mt-[2lh]">
	{#if screenshots}
		{#each screenshots as screenshot, i}
			<figure class="bg-fg/5">
				<Img
					class="w-full text-transparent"
					image={screenshot}
					alt={metadata?.title}
					draggable={false}
					loading={i === 0 ? 'eager' : 'lazy'}
				/>
			</figure>
		{/each}
	{/if}

	<a
		class="bg-fg/5 p-ch not-hover:text-fg/30 relative grid aspect-video place-content-center overflow-hidden text-center text-balance transition-colors"
		href={url}
		target="_blank"
	>
		{url?.replace(/^https?:\/\/(www\.)?/, '')}
		<span class="m-ch absolute top-0 right-0">↗</span>
	</a>
</section>
