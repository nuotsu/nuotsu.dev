<script lang="ts">
	import './layout.css'
	import { browser, dev } from '$app/environment'
	import { afterNavigate, beforeNavigate } from '$app/navigation'
	import ASCII from '$ui/ascii.svelte'
	import Footer from '$ui/footer.svelte'
	import Header from '$ui/header.svelte'
	import Metadata from '$ui/metadata.svelte'
	import posthog from 'posthog-js'

	let { children } = $props()

	if (browser && !dev) {
		beforeNavigate(() => posthog.capture('$pageleave'))
		afterNavigate(() => posthog.capture('$pageview'))
	}
</script>

<Metadata />

<Header />

<main class="space-y-lh">{@render children()}</main>

<Footer />

<ASCII />
