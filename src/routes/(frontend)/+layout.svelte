<script lang="ts">
	import { onNavigate } from '$app/navigation'
	import SkipToContent from '@/ui/SkipToContent.svelte'
	import Header from '@@/src/ui/Header.svelte'
	import Index from '@/ui/Index.svelte'
	import '@/app.css'
	import type { LayoutData } from './$types'
	import type { Snippet } from 'svelte'

	let {
		data,
		children,
	}: {
		data: LayoutData
		children: Snippet
	} = $props()

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

<SkipToContent />
<Header />
<Index />

<main style="grid-area: main">
	{@render children()}
</main>
