<Article title={snippet.title}>
	<div>
		<figure class="demo">
			<slot name="demo"></slot>
		</figure>

		<slot></slot>

		<p>
			<a
				class="link"
				href="https://github.com/nuotsu/nuotsu.dev/tree/master/src/lib/snippets/{ snippet.id }"
				target="_blank" rel="noopener noreferrer"
			>
				Source code
			</a>
		</p>
	</div>
</Article>

<script>
	import Article from '$lib/Article.svelte'

	export let snippet
</script>
