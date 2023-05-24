<svelte:head>
	<title>Mitchell Christ — Web Dev</title>
	<meta
		name="description"
		content="A fullstack web developer with focus on building scalable websites using modern technologies including Next.js, SvelteKit, TypeScript and Tailwind CSS."
	>
</svelte:head>

<header class="sticky pb-12 top-0 z-10 section bg-black/60 backdrop-blur-sm backdrop-brightness-125 text-center">
	<h1>Mitchell Kazumaru Christ <span class="OR">||</span> nuotsu</h1>
</header>

<main>
	<slot></slot>
</main>

<style>
	header {
		mask-image: linear-gradient(
			to top,
			transparent,
			black 3rem,
			black
		);
	}
</style>

<script lang="ts">
	import '../styles/app.css'
</script>
