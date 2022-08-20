<article>
	<h1 class="vertical">{title}</h1>

	<div>
		<slot></slot>
	</div>
</article>

<style>
	article {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.5ch;
	}
</style>

<script>
	export let title
</script>
