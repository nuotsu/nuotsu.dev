<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<div bind:this={studioEl}></div>

<style>
	:global(html, body) {
		all: unset;
	}

	div {
		height: 100svh;
	}
</style>

<script lang="ts">
	import { renderStudio } from 'sanity'
	import config from '@/sanity/sanity.config'

	let studioEl = $state<HTMLDivElement | null>(null)

	$effect(() => {
		if (studioEl) {
			renderStudio(studioEl, config)
		}
	})
</script>
