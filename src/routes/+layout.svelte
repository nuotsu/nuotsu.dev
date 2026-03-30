<script lang="ts">
	import './layout.css'
	import { browser, dev } from '$app/environment'
	import { afterNavigate, beforeNavigate } from '$app/navigation'
	import Metadata from '$ui/metadata.svelte'
	import posthog from 'posthog-js'

	let { children } = $props()

	if (browser && !dev) {
		beforeNavigate(() => posthog.capture('$pageleave'))
		afterNavigate(() => posthog.capture('$pageview'))
	}

	const aliases = ['nuotsu', 'XZ', 'Kazumaru']

	async function fetchVisitors() {
		const response = await fetch('/api/visitors')
		return response.json()
	}
</script>

<Metadata />

<header class="space-y-lh">
	<h1 class="h1 mb-0">Mitchell Christ</h1>
	<p class="text-current/50 before:content-['@_']">
		{#each aliases as alias, i}
			<em>{alias}</em>{#if i < aliases.length - 1}{' / '}{/if}
		{/each}
	</p>

	<nav>
		<ol class="list-[lower-roman] pl-[5ch] hover-list marker:text-current/50 [&_a]:block">
			<li><a href="#about">About</a></li>
			<li><a href="#projects">Projects</a></li>
			<li><a href="#testimonials">Testimonials</a></li>
			<li><a href="#writing">Writing</a></li>
			<li><a href="#archive">Archive</a></li>
			<li><a href="#contact">Contact</a></li>
		</ol>
	</nav>
</header>

<main class="space-y-lh">{@render children()}</main>

<footer>
	<h2>Footer</h2>

	<output>
		Visitors:
		{#await fetchVisitors()}
			<loading></loading>
		{:then { visitors }}
			<span class="transition-opacity starting:opacity-0">
				{new Intl.NumberFormat().format(visitors)}
			</span>
		{/await}
	</output>

	<p class="text-current/50">&copy; {new Date().getFullYear()} nuotsu. Web Dev is my passion.</p>
</footer>
