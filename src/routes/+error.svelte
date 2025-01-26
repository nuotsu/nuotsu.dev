<Header />

<main class="px-[1ch]">
	<h1 class="font-normal">{page.status}</h1>
	<p>{page.error?.message}</p>
</main>

<Footer />

<script lang="ts">
	import { page } from '$app/state'
	import Header from '@/lib/Header.svelte'
	import Footer from '@/lib/Footer.svelte'
	import '@/styles/app.css'
</script>
