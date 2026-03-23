<script lang="ts">
	import './layout.css'
	import { browser } from '$app/environment'
	import { afterNavigate, beforeNavigate } from '$app/navigation'
	import Clouds from '$ui/clouds.svelte'
	import Metadata from '$ui/metadata.svelte'
	import Nav from '$ui/nav.svelte'
	import QR from '$ui/qr.svelte'
	import VisitorCount from '$ui/visitor-count.svelte'
	import posthog from 'posthog-js'

	let { children } = $props()

	if (browser) {
		beforeNavigate(() => posthog.capture('$pageleave'))
		afterNavigate(() => posthog.capture('$pageview'))
	}
</script>

<Metadata />

<div class="flex min-h-svh flex-col">
	<header class="section grid gap-ch">
		<Clouds class="h-[8lh] rounded" />
		<a href="/">Mitchell Christ <span class="text-subdued">// nuotsu</span></a>
	</header>

	<Nav />

	<main class="grow">{@render children()}</main>

	<footer class="section flex items-center justify-center gap-ch">
		<QR />

		<div class="text-sm text-subdued">
			<VisitorCount />
			<p>&copy; {new Date().getFullYear()} Mitchell Christ</p>
		</div>
	</footer>
</div>
