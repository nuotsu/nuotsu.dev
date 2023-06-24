<Header />

<main class="max-w-screen-lg mx-auto px-4 grid gap-4">
	<slot></slot>
</main>

<footer class="py-8 px-4">
	<Sticker/>
</footer>

<script>
	import Header from '$lib/Header.svelte'
	import Sticker from '$lib/Sticker.svelte'
	import '../styles/app.css'
</script>
