<script lang="ts">
	import { onNavigate } from '$app/navigation'
	import SkipToContent from '@/ui/SkipToContent.svelte'
	import Header from '@@/src/ui/Header.svelte'
	import Footer from '@@/src/ui/Footer.svelte'
	import '@/app.css'
	import type { LayoutData } from './$types'
	import type { Snippet } from 'svelte'

	let { data, children }: { data: LayoutData; children: Snippet } = $props()

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})
</script>

<svelte:head>
	<meta name="theme-color" content="#000" />
</svelte:head>

<SkipToContent />

<div class="gap-ch p-ch flex min-h-dvh flex-col">
	<Header projects={data.projects} />

	<main class="gap-ch flex grow flex-col justify-center">{@render children()}</main>

	<Footer />
</div>
