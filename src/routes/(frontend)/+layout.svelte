<script lang="ts">
	import { onNavigate } from '$app/navigation'
	import SkipToContent from '@/ui/SkipToContent.svelte'
	import ProjectList from '@/ui/ProjectList.svelte'
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

<SkipToContent />

<header class="from-fg sticky top-0 z-10 bg-linear-to-r">
	<a class="text-bg" href="/">nuotsu</a>
</header>

<ProjectList projects={data.projects} />

<main class="flex grow flex-col">{@render children()}</main>

<footer class=" gap-ch flex items-baseline justify-center pb-[env(safe-area-inset-bottom)]">
	<a href="https://github.com/nuotsu">GitHub</a>
	<a href="https://x.com/marutchell">X</a>
	<a href="/about">About</a>
</footer>
