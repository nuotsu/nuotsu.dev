<script lang="ts">
	import Headline from '$ui/headline.svelte'

	const keywords = [
		'Frontend Web Dev.',
		'CSS Nerd.',
		'Webmaster.',
		'Next.js Guru.',
		'Svelte enthusiast.',
		'Shopify expert.',
		'Designer-turned-developer.',
		'a.k.a. nuotsu.',
	]
</script>

<section>
	<Headline>Hero</Headline>

	<ul>
		{#each keywords as keyword}
			<li>{keyword}</li>
		{/each}
	</ul>
</section>
