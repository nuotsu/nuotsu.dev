<script lang="ts">
	import appleTouchIcon from '$assets/apple-touch-icon.png'
	import favicon from '$assets/favicon.png'
	import og from '$assets/og.png'

	const metadata = {
		title: 'Mitchell Christ | nuotsu',
		description:
			'Frontend Web Developer based in Irvine, California. Currently building SanityPress and an MLB live scorebug.',
		imageAlt: 'Portrait of Mitchell Christ',
	}
</script>

<svelte:head>
	<link rel="icon" type="image/png" sizes="96x96" href={favicon} />
	<link rel="apple-touch-icon" href={appleTouchIcon} />

	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={metadata.title} />
	<meta property="og:description" content={metadata.description} />
	<meta property="og:image" content={og} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={metadata.imageAlt} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={metadata.title} />
	<meta name="twitter:description" content={metadata.description} />
	<meta name="twitter:image" content={og} />
	<meta name="twitter:image:alt" content={metadata.imageAlt} />

	<meta
		name="viewport"
		content="width=device-width, initial-scale=1.0, viewport-fit=cover"
	/>
</svelte:head>
