<svelte:head>
	<title>Mitchell Kazumaru Christ | nuotsu</title>
	<meta name="description" content="I build websites & generate images." />
</svelte:head>

<Hero hero={data.site.hero} />

<main class="relative z-1">
	{@render children()}
</main>

<script lang="ts">
	import '@/styles/app.css'
	import type { Snippet } from 'svelte'
	import type { LayoutData } from './$types'
	import Hero from '@/lib/Hero.svelte'

	let {
		data,
		children,
	}: {
		data: LayoutData
		children: Snippet
	} = $props()
</script>
