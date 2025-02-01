<svelte:head>
	<title>Mitchell Kazumaru Christ | nuotsu</title>
	<meta name="description" content="I build websites & generate images." />
</svelte:head>

<SkipToContent />
<Header />

<main id="main" class="space-y-[1ch]">
	{@render children()}
</main>

<Footer />

<script lang="ts">
	import SkipToContent from '@/lib/SkipToContent.svelte'
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
