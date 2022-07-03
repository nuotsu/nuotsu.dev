<article>
	<h1>{snippet.title}</h1>

	<figure class="demo">
		<slot name="demo"></slot>
	</figure>

	<slot></slot>
</article>

<script>
	export let snippet
</script>
