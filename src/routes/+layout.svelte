<script lang="ts">
	import './layout.css'
	import { browser, dev } from '$app/environment'
	import { afterNavigate, beforeNavigate } from '$app/navigation'
	import favicon from '$assets/favicon.png?enhanced'
	import ASCII from '$ui/ascii.svelte'
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
	<div class="flex gap-ch">
		<hgroup class="grow">
			<h1 class="h1 mb-0">Mitchell Christ</h1>
			<p class="text-current/50 before:content-['@_']">
				{#each aliases as alias, i}
					<em>{alias}</em>{#if i < aliases.length - 1}{' / '}{/if}
				{/each}
			</p>
		</hgroup>

		<enhanced:img
			class="size-[2lh] shrink-0 rounded-full text-transparent opacity-0 transition-opacity"
			src={favicon}
			alt="Mitchell Christ"
			width="40"
			height="40"
			loading="eager"
			draggable={false}
			onload={() => {
				const img = document.querySelector('img')
				if (img) {
					img.classList.remove('text-transparent', 'opacity-0')
				}
			}}
		/>
	</div>

	<nav>
		<ol class="list-[lower-roman] pl-[5ch] hover-list marker:text-current/50 [&_a]:block">
			<li><a href="#about">About</a></li>
			<li><a href="#projects">Projects</a></li>
			<li><a href="#writing">Writing</a></li>
			<li><a href="#testimonials">Testimonials</a></li>
			<li><a href="#archive">Archive</a></li>
			<li><a href="#contact">Contact</a></li>
		</ol>
	</nav>
</header>

<main class="space-y-lh">{@render children()}</main>

<footer>
	<h2>Footer</h2>

	<dl class="grid grid-cols-[auto_1fr] gap-x-ch [&_dt]:text-right">
		<dt>Age:</dt>
		<dd>
			<label class="group/age">
				<input type="checkbox" hidden />

				<span class="transition-opacity group-has-checked/age:hidden starting:opacity-0">
					{new Intl.NumberFormat().format(
						Math.floor(
							(new Date().getTime() - new Date('1995-12-04').getTime()) / (1000 * 60 * 60 * 24),
						),
					)} days
				</span>

				<span class="transition-opacity group-not-has-checked/age:hidden starting:opacity-0">
					{(
						(new Date().getTime() - new Date('1995-12-04').getTime()) /
						(1000 * 60 * 60 * 24 * 365)
					).toFixed(1)} years
				</span>
			</label>
		</dd>

		<dt>Visitors:</dt>
		<dd>
			{#await fetchVisitors()}
				<loading></loading>
			{:then { visitors }}
				<span class="transition-opacity starting:opacity-0">
					{new Intl.NumberFormat().format(visitors)}
				</span>
			{/await}
		</dd>
	</dl>

	<p class="text-current/50">&copy; {new Date().getFullYear()} nuotsu. Web Dev is my passion.</p>
</footer>

<ASCII />
