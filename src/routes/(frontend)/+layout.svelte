<script lang="ts">
	import SkipToContent from '@/ui/SkipToContent.svelte'
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
	<meta name="description" content="I build websites & generate images." />
</svelte:head>

<SkipToContent />

<main id="main" class="grid min-h-svh place-items-center">
	{@render children()}
</main>
