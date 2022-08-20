<Snippet {snippet}>
	<svelte:component this={snippet.demo} slot="demo" />
	<svelte:component this={snippet.content} />
</Snippet>

<script>
	export let snippet
</script>

<script context="module">
	import snippets from '$lib/snippets/all-snippets.js'
	import Snippet from '$lib/snippets/Snippet.svelte'

	export async function load({ params }) {
		const snippet = snippets.find(({ id }) => id === params.id)

		if (!snippet) {
			return {
				status: 300,
				redirect: '/',
			}
		}

		return {
			props: {
				snippet,
			}
		}
	}
</script>
