<script lang="ts">
	import type { LayoutProps } from './$types'
	import favicon from '#lib/assets/favicon.svg'
	import './layout.css'

	let { children }: LayoutProps = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="" />
</svelte:head>

{@render children()}
