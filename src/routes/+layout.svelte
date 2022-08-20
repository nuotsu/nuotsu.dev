<header>
	<a href="/">nuotsu</a>
</header>

<div>
	<nav>
		<About/>
		<Works/>
		<Snippets/>
	</nav>

	<main>
		<slot></slot>
	</main>
</div>

<style>
	div {
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
		gap: 2rem;
		margin-top: 1rem;
	}

	nav {
		display: grid;
		gap: 1rem;
	}
</style>

<script>
	import About from '$lib/About.svelte'
	import Works from '$lib/Works.svelte'
	import Snippets from '$lib/Snippets.svelte'
	import '../app.css'
</script>
