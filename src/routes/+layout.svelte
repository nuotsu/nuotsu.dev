<script lang="ts">
	import './layout.css'
	import { browser, dev } from '$app/environment'
	import { afterNavigate, beforeNavigate } from '$app/navigation'
	import Metadata from '$ui/metadata.svelte'
	import PokémonTeam from '$ui/pokemon-team.svelte'
	import posthog from 'posthog-js'

	let { children } = $props()

	if (browser && !dev) {
		beforeNavigate(() => posthog.capture('$pageleave'))
		afterNavigate(() => posthog.capture('$pageview'))
	}

	async function fetchVisitors() {
		const res = await fetch('/api/visitors')
		return res.json()
	}
</script>

<Metadata />

<header class="top-ch md:sticky">
	<h1>Mitchell Christ</h1>
	<p>a.k.a. <em>nuotsu</em></p>

	<hr />

	<nav>
		<ol style:list-style="upper-roman">
			<li><a href="#about">About</a></li>
			<li><a href="#projects">Projects</a></li>
			<li><a href="#testimonials">Testimonials</a></li>
			<li><a href="#writing">Writing</a></li>
			<li><a href="#archive">Site Archive</a></li>
			<li><a href="#contact">Contact</a></li>
		</ol>
	</nav>
</header>

<main>
	{@render children()}
</main>

<hr class="col-span-full w-full" />

<footer class="col-span-full">
	<PokémonTeam />

	<output>
		{#await fetchVisitors()}
			Counting visitors...
		{:then { visitors }}
			Visitors: {new Intl.NumberFormat().format(visitors)}
		{/await}
	</output>

	<p style:font-family="Comic Sans MS, cursive">web dev is my passion.™</p>

	<p>&copy; {new Date().getFullYear()} Mitchell Christ / nuotsu</p>
</footer>
