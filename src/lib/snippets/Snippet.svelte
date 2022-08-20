<svelte:head>
	<title>{snippet.title} | nuotsu</title>
</svelte:head>

<Article title={snippet.title}>
	<div>
		<figure class="demo">
			<slot name="demo"></slot>
		</figure>

		<slot></slot>

		<p class="flex items-center">
			<small>{'<'}</small>
			<a
				class="link"
				href="https://github.com/nuotsu/nuotsu.dev/tree/master/src/lib/snippets/{ snippet.id }"
				target="_blank" rel="noopener noreferrer"
			>
				Source code
			</a>
			<small>{'/>'}</small>
		</p>
	</div>
</Article>

<style>
	div > :global(* + *) {
		margin-top: 0.5em;
	}
</style>

<script>
	import Article from '$lib/Article.svelte'

	export let snippet
</script>
