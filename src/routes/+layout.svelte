<script lang="ts">
	import './layout.css'
	import { browser } from '$app/environment'
	import { afterNavigate, beforeNavigate } from '$app/navigation'
	import Metadata from '$ui/metadata.svelte'
	import posthog from 'posthog-js'

	let { children } = $props()

	if (browser) {
		beforeNavigate(() => posthog.capture('$pageleave'))
		afterNavigate(() => posthog.capture('$pageview'))
	}
</script>

<Metadata />

{@render children()}
