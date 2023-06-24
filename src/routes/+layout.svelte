<header class="text-center p-4">
	<h1 class="font-mets text-orange-400 text-7xl drop-shadow-real">
		<a href="/">M</a>
	</h1>

	<p class="font-boston text-orange-400 uppercase drop-shadow-real text-xs">
		Mitchell Kazumaru Christ
	</p>
</header>

<main class="max-w-screen-lg mx-auto px-4 grid gap-4">
	<slot></slot>
</main>

<footer class="py-8 px-4">
	<Sticker/>
</footer>

<script>
	import Sticker from '$lib/Sticker.svelte'
	import '../styles/app.css'
</script>
