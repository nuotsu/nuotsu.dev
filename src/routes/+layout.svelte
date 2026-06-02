<script lang="ts">
	import './app.css'
	import Metadata from '$ui/metadata.svelte'

	let { children } = $props()
</script>

<Metadata />

<header>
	<h1>Mitchell Christ</h1>
	<p>alias: <i>nuotsu</i>, <i>kazumaru</i>, <i>XZ</i></p>
</header>

<main class="mt-[2lh] space-y-[2lh]">
	{@render children()}
</main>
