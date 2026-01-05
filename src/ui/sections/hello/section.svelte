<script lang="ts">
	import Headline from '$ui/headline.svelte'
	import SourceCode from '$ui/source-code.svelte'
	import Sphere from './sphere.svelte'
</script>

<section>
	<Headline>Hello world</Headline>

	<Sphere
		words={[
			'Frontend web dev',
			'CSS Nerd',
			'Webmaster',
			// 'Sanity MVP',
			'Next.js Guru',
			'Svelte enthusiast',
			'Shopify expert',
			'Designer-turned-developer',
			'a.k.a. nuotsu',
		]}
	/>

	<SourceCode file="src/ui/sections/hello/section.svelte" />
</section>
