<script lang="ts">
	import type { LayoutProps } from './$types'
	import Metadata from '#ui/metadata.svelte'
	import './layout.css'

	let { children }: LayoutProps = $props()
</script>

<Metadata />

<svelte:head>
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="" />
</svelte:head>

{@render children()}
