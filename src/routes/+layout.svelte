<header class="text-center p-4">
	<h1 class="font-tuscan text-orange-400 text-7xl drop-shadow-real">
		<a href="/">M</a>
	</h1>
</header>

<slot></slot>

<footer>
	<Sticker/>
</footer>

<script>
	import Sticker from '$lib/Sticker.svelte'
	import '../styles/app.css'
</script>
