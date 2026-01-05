<script lang="ts">
	import { browser } from '$app/environment'
	import { afterNavigate, beforeNavigate } from '$app/navigation'
	import Footer from '$ui/footer.svelte'
	import Header from '$ui/header.svelte'
	import Metadata from '$ui/metadata.svelte'
	import posthog from 'posthog-js'
	import './app.css'

	const { children } = $props()

	if (browser) {
		beforeNavigate(() => posthog.capture('$pageleave'))
		afterNavigate(() => posthog.capture('$pageview'))
	}
</script>

<Metadata />

<div class="lines-b lines-t mx-auto max-w-2xl px-lh">
	<Header />
	<main class="lines-x *:lines-t *:last:lines-b">
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	div {
		margin-bottom: max(0.5px, env(safe-area-inset-bottom));
	}
</style>
