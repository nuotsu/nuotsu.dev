<script lang="ts">
	import favicon32 from '#lib/assets/favicon/favicon-32.png'
	import favicon192 from '#lib/assets/favicon/favicon-192.png'
	import appleTouchIcon from '#lib/assets/favicon/apple-touch-icon.png'
	import og from '#lib/assets/og.jpg'
	import { SITE } from '#lib/site.ts'

	const title = 'Mitchell Christ | nuotsu'
	const description =
		'Frontend Web Developer based in Irvine, California. Currently building SanityPress and an MLB live scorebug, while vibe-coding macOS apps.'
	const image = new URL(og, SITE).href // crawlers need absolute URLs
	const imageAlt = 'Portrait of Mitchell Christ'

	const person = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Mitchell Christ',
		alternateName: ['nuotsu', 'Kazumaru'],
		url: SITE,
		image,
		jobTitle: 'Frontend Web Developer',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Irvine',
			addressRegion: 'CA',
			addressCountry: 'US'
		},
		sameAs: [
			'https://github.com/nuotsu',
			'https://github.com/mitchuman',
			'https://linkedin.com/in/nuotsu',
			'https://x.com/marutchell'
		]
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={SITE} />
	<meta name="author" content="Mitchell Christ" />
	<meta name="theme-color" content="#000000" />
	<meta name="color-scheme" content="dark" />

	<link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
	<link rel="icon" type="image/png" sizes="192x192" href={favicon192} />
	<link rel="apple-touch-icon" href={appleTouchIcon} />

	<meta property="og:type" content="profile" />
	<meta property="og:url" content={SITE} />
	<meta property="og:site_name" content="nuotsu" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={imageAlt} />
	<meta property="profile:first_name" content="Mitchell" />
	<meta property="profile:last_name" content="Christ" />
	<meta property="profile:username" content="nuotsu" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@marutchell" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content={imageAlt} />

	{@html `<script type="application/ld+json">${JSON.stringify(person).replace(/</g, '\\u003c')}</script>`}
</svelte:head>
