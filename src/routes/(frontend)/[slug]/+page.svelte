<script lang="ts">
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>

<svelte:head>
	<title>{data.project.metadata.title}</title>
	<meta name="description" content={data.project.metadata.description} />
</svelte:head>

<article class="my-auto ml-auto max-w-prose p-[1ch]">
	<h1>
		<strong>{data.project.metadata.title}</strong>

		{#if data.project.date}
			{@const { format } = new Intl.DateTimeFormat('en-US', {
				year: 'numeric',
				month: 'long',
			})}

			<time datetime={data.project.date}>({format(new Date(data.project.date + 'T00:00:00'))})</time
			>
		{/if}
	</h1>
	<p>{data.project.metadata.description}</p>

	<nav class="gap-x-ch flex flex-wrap">
		{#if data.project.url}
			<a href={data.project.url}>Visit {data.project.url.replace(/^https?:\/\//, '')}</a>
		{/if}
		{#if data.project.repo}
			<a href="https://github.com/{data.project.repo}">View on GitHub</a>
		{/if}
	</nav>
</article>
