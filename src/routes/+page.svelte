<script lang="ts">
	import AboveTheFold from '$ui/above-the-fold.svelte'
	import Intro from '$ui/sections/intro.svelte'
	import NotableWorks from '$ui/sections/notable-works.svelte'
	import Projects from '$ui/sections/projects.svelte'
	import Testimonials from '$ui/sections/testimonials.svelte'
	import Gear from '$ui/sections/gear.svelte'
	import About from '$ui/sections/about.svelte'
	import Contact from '$ui/sections/contact.svelte'

	import { intersecting } from '$lib/intersection-observer'
</script>

<svelte:head>
	<title>Mitchell Christ | nuotsu</title>
	<meta
		name="description"
		content="Mitchell Christ is a frontend developer and CSS nerd, currently residing in Irvine, California."
	/>
	<meta name="theme-color" content="#ddddd1" />
</svelte:head>

<AboveTheFold />

<main
	class="relative md:mt-[calc(100svh+1lh)] md:ml-(--toc-width)"
	{@attach intersecting({ 'data-is-intersecting': true })}
>
	<Intro />
	<NotableWorks />
	<Projects />
	<Testimonials />
	<Gear />
	<About />
	<Contact />
</main>
