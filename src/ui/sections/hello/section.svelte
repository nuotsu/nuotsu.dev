<script lang="ts">
	import Headline from '$ui/headline.svelte'
	import Sphere from './sphere.svelte'
</script>

<section>
	<Headline>Hello world</Headline>

	<Sphere
		words={[
			'Frontend Web Dev',
			'CSS Nerd',
			'Webmaster',
			'Next.js Guru',
			'Svelte enthusiast',
			'Shopify expert',
			'Designer-turned-developer',
			'a.k.a. nuotsu',
		]}
	/>
</section>
