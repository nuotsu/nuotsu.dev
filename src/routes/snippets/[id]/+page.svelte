<Snippet {snippet}>
	<svelte:component this={snippet.demo} slot="demo" />
	<svelte:component this={snippet.content} />
</Snippet>

<script>
	import Snippet from '$lib/snippets/Snippet.svelte'

	export let data

	$: ({ snippet } = data)
</script>
