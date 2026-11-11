<script lang="ts">
	import type { LayoutProps } from './$types'
	import favicon32 from '#lib/assets/favicon/favicon-32.png'
	import favicon192 from '#lib/assets/favicon/favicon-192.png'
	import appleTouchIcon from '#lib/assets/favicon/apple-touch-icon.png'
	import './layout.css'

	let { children }: LayoutProps = $props()
</script>

<svelte:head>
	<link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
	<link rel="icon" type="image/png" sizes="192x192" href={favicon192} />
	<link rel="apple-touch-icon" href={appleTouchIcon} />

	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="" />
</svelte:head>

{@render children()}
