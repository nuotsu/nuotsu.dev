<script lang="ts">
	import SkipToContent from '@/ui/SkipToContent.svelte'
	import Header from '@@/src/ui/Header.svelte'
	import Footer from '@@/src/ui/Footer.svelte'
	import type { Snippet } from 'svelte'
	import '@/app.css'

	let {
		children,
	}: {
		children: Snippet
	} = $props()
</script>

<svelte:head>
	<title>Mitchell Kazumaru Christ | nuotsu</title>
	<meta name="description" content="Frontend Developer in Irvine, California." />
</svelte:head>

<SkipToContent />

<Header />

<main id="main" class="grow">
	{@render children()}
</main>

<Footer />
