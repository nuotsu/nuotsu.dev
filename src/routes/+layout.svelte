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

<Header />
<main>
	{@render children()}
</main>
<Footer />
