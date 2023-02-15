<main class="grid grid-rows-[1fr,auto] gap-4 text-center">
	<slot></slot>

	<ExternalLinks/>
</main>

<style>
	main {
		min-height: 100svh;
	}
</style>

<script>
	import ExternalLinks from '@/lib/ExternalLinks.svelte'
	import '@/styles/app.css'
</script>
