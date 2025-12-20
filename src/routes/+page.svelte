<script lang="ts">
	import { intersecting } from '$lib/intersection-observer'
	import About from '$ui/sections/about.svelte'
	import Abstract from '$ui/sections/abstract.svelte'
	import Contact from '$ui/sections/contact.svelte'
	import Domains from '$ui/sections/domains.svelte'
	import Gear from '$ui/sections/gear.svelte'
	import NotableWorks from '$ui/sections/notable-works.svelte'
	import Projects from '$ui/sections/projects.svelte'
	import Testimonials from '$ui/sections/testimonials.svelte'
	import Writing from '$ui/sections/writing.svelte'
</script>

<svelte:head>
	<title>Mitchell Christ | nuotsu</title>
	<meta
		name="description"
		content="Mitchell Christ is a frontend developer and CSS nerd, currently residing in Irvine, California."
	/>
	<meta name="theme-color" content="#ddddd1" />
</svelte:head>

<main
	class="relative flex flex-col overflow-clip md:mt-[2lh] md:ml-(--toc-width)"
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

<style>
	main {
		gap: calc(100svh - 4lh);
	}
</style>
