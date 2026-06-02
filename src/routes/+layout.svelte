<script lang="ts">
	import './app.css'
	import favicon from '$lib/assets/favicon.svg'

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<h1>Mitchell Christ</h1>
	<p>alias: <i>nuotsu</i>, <i>kazumaru</i>, <i>XZ</i></p>
</header>

<main class="mt-[2lh] space-y-[2lh]">
	{@render children()}
</main>
