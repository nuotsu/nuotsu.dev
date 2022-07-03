<h1>{snippet.title}</h1>

<figure class="demo">
	<slot name="demo"></slot>
</figure>

<slot></slot>

<style>
	.demo {
		outline: 1px dashed #0004;
		outline-offset: 2px;
		max-width: max-content;
	}

	.demo:empty {
		display: none;
	}
</style>

<script>
	export let snippet
</script>
