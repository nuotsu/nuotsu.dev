<script lang="ts">
	import favicon from '$assets/favicon.png'

	const metadata = {
		title: 'Mitchell Christ | nuotsu',
		description:
			'Mitchell Christ is a frontend developer and CSS nerd, currently residing in Irvine, California.'
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<title>{metadata.title}</title>
	<meta name="description" content={metadata.description} />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={metadata.title} />
	<meta property="og:description" content={metadata.description} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={metadata.title} />
	<meta name="twitter:description" content={metadata.description} />

	<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
</svelte:head>
