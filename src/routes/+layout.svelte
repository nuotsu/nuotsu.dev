<header>
	<a href="/">
		nuotsu
		<span class="text-ink/30">// Mitchell Kazumaru Christ</span>
	</a>
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
	import About from './index/About.svelte'
	import Works from './index/Works.svelte'
	import Snippets from './index/Snippets.svelte'
	import '../app.css'
</script>
