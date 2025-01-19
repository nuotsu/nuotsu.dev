<svelte:head>
	<title>Mitchell Kazumaru Christ | nuotsu</title>
	<meta name="description" content="I build websites & generate images." />
</svelte:head>

<Header />

<main
	class="grow space-y-[1ch] landscape:pr-[env(safe-area-inset-right)] landscape:pl-[env(safe-area-inset-left)]"
>
	{@render children()}
</main>

<Footer />

<script lang="ts">
	import Header from '@/lib/Header.svelte'
	import Footer from '@/lib/Footer.svelte'
	import type { Snippet } from 'svelte'
	import '@/styles/app.css'

	let {
		children,
	}: {
		children: Snippet
	} = $props()
</script>
