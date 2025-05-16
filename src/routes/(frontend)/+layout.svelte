<script lang="ts">
	import SkipToContent from '@/ui/SkipToContent.svelte'
	import type { Snippet } from 'svelte'
	import '@/styles/app.css'

	let {
		children,
	}: {
		children: Snippet
	} = $props()
</script>

<svelte:head>
	<title>Mitchell Kazumaru Christ | nuotsu</title>
	<meta name="description" content="I build websites & generate images." />
</svelte:head>

<SkipToContent />

<main id="main">
	{@render children()}
</main>
