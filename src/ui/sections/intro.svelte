<script lang="ts">
	import Section from './section.svelte'

	const words = [
		'Frontend Web Dev',
		'CSS Nerd',
		'Webmaster',
		'Next.js expert',
		'Svelte-enthusiast',
		'Designer-turned-developer',
	]
</script>

<Section id="intro">
	<p class="sr-only">Introduction</p>

	<h2 class="h1 text-balance">
		{#each words as word, i}
			<span style="opacity: {i > 1 ? 1 - i / words.length : 1};">
				{word}.
			</span>{' '}
		{/each}
	</h2>
</Section>

<style>
	h2 span {
		display: inline-block;
	}
</style>
