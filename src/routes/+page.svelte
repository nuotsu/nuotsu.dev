<script lang="ts">
	import AboveTheFold from '$ui/above-the-fold.svelte'
	import Abstract from '$ui/sections/abstract.svelte'
	import NotableWorks from '$ui/sections/notable-works.svelte'
	import Projects from '$ui/sections/projects.svelte'
	import Writing from '$ui/sections/writing.svelte'
	import Testimonials from '$ui/sections/testimonials.svelte'
	import Domains from '$ui/sections/domains.svelte'
	import Gear from '$ui/sections/gear.svelte'
	import About from '$ui/sections/about.svelte'
	import Contact from '$ui/sections/contact.svelte'
	import Footer from '$ui/footer.svelte'

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
	class="relative flex flex-col md:mt-lh md:ml-(--toc-width)"
	{@attach intersecting({ 'data-is-intersecting': true })}
>
	<Abstract />
	<NotableWorks />
	<Projects />
	<Writing />
	<Testimonials />
	<Domains />
	<Gear />
	<About />
	<Contact />
</main>

<Footer />

<style>
	main {
		gap: calc(100svh - 4lh);
	}
</style>
