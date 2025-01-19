<svelte:head>
	<title>Mitchell Kazumaru Christ | nuotsu</title>
	<meta name="description" content="I build websites & generate images." />
</svelte:head>

<Header />

<main class="grow">
	{@render children()}
</main>

<footer class="sticky bottom-0 mb-[env(safe-area-inset-bottom)]">
	<!-- svelte-ignore a11y_distracting_elements -->
	<marquee>
		<h1>I build websites & generate images.</h1>
	</marquee>
</footer>

<script lang="ts">
	import Header from '@/lib/Header.svelte'
	import type { Snippet } from 'svelte'
	import '@/styles/app.css'

	let {
		children,
	}: {
		children: Snippet
	} = $props()
</script>
