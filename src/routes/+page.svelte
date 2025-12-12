<script lang="ts">
	import AboveTheFold from '$ui/above-the-fold.svelte'
	import Intro from '$ui/intro.svelte'
	import Works from '$ui/works.svelte'
	import Testimonials from '$ui/testimonials.svelte'
	import Gear from '$ui/gear.svelte'
	import About from '$ui/about.svelte'
	import { intersecting } from '$lib/intersection-observer'
</script>

<AboveTheFold />

<main
	class="mt-lh md:ml-(--toc-width)"
	{@attach intersecting({ 'data-is-intersecting': true })}
>
	<Intro />
	<Works />
	<Testimonials />
	<Gear />
	<About />
</main>
