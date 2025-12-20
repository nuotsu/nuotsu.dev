<script lang="ts">
	import { browser } from '$app/environment'
	import { afterNavigate, beforeNavigate } from '$app/navigation'
	import favicon from '$assets/favicon.png'
	import AboveTheFold from '$ui/above-the-fold.svelte'
	import Encounter from '$ui/encounter.svelte'
	import Footer from '$ui/footer.svelte'
	import posthog from 'posthog-js'
	import type { LayoutProps, LayoutServerData } from './$types'
	import './app.css'

	const { data, children }: LayoutProps = $props()
	const views = $derived((data as LayoutServerData)?.views ?? 0)

	if (browser) {
		beforeNavigate(() => posthog.capture('$pageleave'))
		afterNavigate(() => posthog.capture('$pageview'))
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<AboveTheFold />

{@render children()}

<Footer />
<Encounter {views} />
