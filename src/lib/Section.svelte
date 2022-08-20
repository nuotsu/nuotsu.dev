<section>
	<h2 class="vertical">{title}</h2>

	<slot></slot>
</section>

<style>
	section {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.5ch;
	}
</style>

<script>
	export let title
</script>
