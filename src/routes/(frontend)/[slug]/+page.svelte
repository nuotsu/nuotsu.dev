<script lang="ts">
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	$inspect(data)
</script>

<svelte:head>
	<title>{data.project.metadata.title}</title>
	<meta name="description" content={data.project.metadata.description} />
</svelte:head>

<article>
	<h1>{data.project.metadata.title}</h1>
	<p>{data.project.metadata.description}</p>

	{#if data.project.url}
		<a href={data.project.url}>Visit {data.project.url.replace(/^https?:\/\//, '')}</a>
	{/if}

	{#if data.project.repo}
		<a href="https://github.com/{data.project.repo}">View on GitHub</a>
	{/if}
</article>
