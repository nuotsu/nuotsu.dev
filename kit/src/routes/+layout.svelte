<svelte:head>
	<title>Mitchell Kazumaru Christ | nuotsu</title>
	<meta
		name="description"
		content="I make websites. I generate images with Midjourney, too."
	/>
</svelte:head>

<main class="min-h-dvh flex flex-col">
	<slot></slot>
</main>

<style>
	main {
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>

<script lang="ts">
	import { inject } from '@vercel/analytics'
	import '../styles/app.css'

	inject()
</script>
