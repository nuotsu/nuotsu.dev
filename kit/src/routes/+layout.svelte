<main class="mx-auto grid min-h-svh" data-route={$page.url.pathname}>
	<Header />

	<slot />
</main>

<style>
	main {
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
