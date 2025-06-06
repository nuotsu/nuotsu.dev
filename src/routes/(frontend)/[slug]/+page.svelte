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

<article>
	<h1>
		<i>{metadata?.title}</i>

		{#if date}
			<time datetime={date}>
				({new Date(date + 'T00:00:00').getFullYear()})
			</time>
		{/if}
	</h1>

	<p>{metadata?.description}</p>

	<nav>
		<a href={url}>Visit {url?.replace(/https?:\/\//, '')}</a>
	</nav>

	{#if screenshots}
		{#each screenshots as screenshot, i}
			<figure>
				<Img image={screenshot} alt={metadata?.title} loading={i === 0 ? 'eager' : 'lazy'} />
			</figure>
		{/each}
	{/if}
</article>
