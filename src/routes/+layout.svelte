<main class="grid grid-rows-[1fr,auto] gap-4 min-h-screen text-center">
	<slot></slot>

	<ExternalLinks/>
</main>

<script>
	import ExternalLinks from '@/lib/ExternalLinks.svelte'
	import '@/styles/app.css'
</script>
