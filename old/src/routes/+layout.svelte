<main class="mx-auto min-h-svh" data-route={$page.url.pathname}>
	<Header />

	<slot />
</main>

<style>
	main,
	:global(.content-grid) {
		display: grid;
		grid-template-columns: [bleed-start] auto [content-start] theme(width.96) [content-end] auto [bleed-end];

		& > :global(*) {
			grid-column: content;
		}
	}
</style>

<script lang="ts">
	import Header from '$lib/Header.svelte'
	import { page } from '$app/stores'
	import '../styles/app.css'
</script>
