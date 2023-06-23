<header class="text-center p-4 pb-0">
	<h1 class="font-tuscan text-orange-400 text-7xl drop-shadow-real">
		<a href="/">M</a>
	</h1>
</header>

<main class="max-w-screen-lg mx-auto px-4 grid gap-4">
	<slot></slot>
</main>

<footer class="p-4">
	<Sticker/>
</footer>

<script>
	import Sticker from '$lib/Sticker.svelte'
	import '../styles/app.css'
</script>
