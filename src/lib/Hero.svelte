<svelte:head>
	{#each [desktop, mobile] as href}
		<link rel="preload" {href} as="image" />
	{/each}
</svelte:head>

<picture>
	{#if desktop}
		{@const { width, height } = getImageDimensions(hero.mobile)}
		<source
			srcset={desktop}
			{width}
			{height}
			media="(orientation: landscape)"
		/>
	{/if}

	{#if mobile}
		{@const { width, height } = getImageDimensions(hero.mobile)}
		<img
			src={mobile}
			{width}
			{height}
			loading="eager"
			draggable="false"
			alt="nuotsu Cyberpunk, Bladerunner aesthetic"
		/>
	{/if}
</picture>

<style>
	picture {
		pointer-events: none;
	}

	img {
		position: fixed;
		inset: 0;
		width: 100svw;
		height: 100svh;
		object-fit: cover;
		animation: appear 3s ease-in-out;
	}

	@keyframes appear {
		from {
			opacity: 0;
			filter: blur(8px);
		}
	}
</style>

<script lang="ts">
	import { urlFor } from '@/sanity/lib/image'
	import { getImageDimensions } from '@sanity/asset-utils'

	let {
		hero,
	}: {
		hero: Sanity.Site['hero']
	} = $props()

	const [desktop, mobile] = [
		hero.desktop && urlFor(hero.desktop).url(),
		hero.mobile && urlFor(hero.mobile).url(),
	].filter(Boolean)
</script>
