import cusco from '$assets/projects/cusco.png?enhanced'
import human from '$assets/projects/human.png?enhanced'
import mlb from '$assets/projects/mlb.png?enhanced'
import sanitypressWithTypegen from '$assets/projects/sanitypress-with-typegen.png?enhanced'
import sanitypress from '$assets/projects/sanitypress.png?enhanced'
import sb3 from '$assets/projects/sb3.png?enhanced'
import theOhtani from '$assets/projects/theohtani.png?enhanced'

const projects: {
	featured?: true
	title: string
	href: string
	repo?: string
	client?: true
	image?: any
}[] = [
	{
		featured: true,
		title: 'SanityPress with Typegen',
		href: 'https://typed.sanitypress.dev',
		image: sanitypressWithTypegen,
		repo: 'sanitypress-with-typegen',
	},
	{
		featured: true,
		title: 'MLB Scorebug & API Playground (2026)',
		href: 'https://mlb.theohtani.com',
		image: mlb,
		repo: 'mlb',
	},
	{
		// featured: true,
		title: 'MLB Scorebug (2025)',
		href: 'https://sb3.theohtani.com',
		image: sb3,
		repo: 'sb3.theohtani.com',
	},
	{
		// featured: true,
		title: 'SanityPress (original)',
		href: 'https://github.com/nuotsu/sanitypress',
		image: sanitypress,
		repo: 'sanitypress',
	},
	{
		featured: true,
		title: 'The Ohtani',
		href: 'https://theohtani.com',
		image: theOhtani,
		repo: 'theohtani.com',
	},
	{
		title: 'SvelteKit + Sanity template ',
		href: 'https://github.com/nuotsu/sveltekit-sanity',
		repo: 'sveltekit-sanity',
	},
	{
		title: 'things',
		href: 'https://things.nuotsu.dev',
		repo: 'things.nuotsu.dev',
	},
	{ title: 'ic0n.dev', href: 'https://ic0n.dev', repo: 'ic0n.dev' },
	{
		title: 'GitHub iframe',
		href: 'https://github-iframe.vercel.app',
		repo: 'github-iframe',
	},
	{
		title: 'Numeration',
		href: 'https://numeration.vercel.app',
		repo: 'numeration',
	},
	// {
	// 	title: 'One Piece Chapters',
	// 	href: 'https://onepiece-chapters.vercel.app',
	// 	repo: 'onepiece-chapters',
	// },
	{
		title: 'Timeless Shopify Theme',
		href: 'https://timeless-docs.vercel.app',
		repo: 'timeless-shopify-theme',
	},
	{
		title: 'Shopify App Comparer',
		href: 'https://shopify-compare.vercel.app',
		repo: 'mitchuman/shopify-compare-apps',
	},
	{
		title: 'Midjourney',
		href: 'https://www.midjourney.com/@nuotsu',
	},
	{
		// featured: true,
		title: 'human.marketing',
		href: 'https://human.marketing',
		client: true,
		image: human,
	},
	{
		// featured: true,
		title: 'CUSCO USA',
		href: 'https://cuscousainc.com',
		client: true,
		image: cusco,
	},
	{
		title: 'ECL Americas',
		href: 'https://eclamericas.com',
		client: true,
	},
	{
		title: 'Attention Monsters',
		href: 'https://attentionmonsters.com',
		client: true,
	},
] as const

export const other = projects.filter((p) => !p.featured)
export const featured = projects.filter((p) => p.featured)

export const archive: {
	date: string
	href: string
}[] = [
	{
		date: '2025-01-01',
		href: 'https://nuotsu-k6pai8508-nuotsu-dev.vercel.app',
	},
	{
		date: '2025-10-12',
		href: 'https://nuotsu-pq62v9mci-nuotsu-dev.vercel.app',
	},
	{
		date: '2025-06-06',
		href: 'https://nuotsu-efn92y0tg-nuotsu-dev.vercel.app',
	},
	{
		date: '2025-04-12',
		href: 'https://nuotsu-mgju9mkd8-nuotsu-dev.vercel.app',
	},
	{
		date: '2024-08-29',
		href: 'https://nuotsu-nzdu576ej-nuotsu-dev.vercel.app',
	},
	{
		date: '2024-01-31',
		href: 'https://nuotsu-2yrf9f4yh-nuotsu.vercel.app',
	},
	{
		date: '2024-01-03',
		href: 'https://nuotsu-ifilajouv-nuotsu.vercel.app',
	},
	{
		date: '2023-11-27',
		href: 'https://nuotsu-nr6to8p7q-nuotsu.vercel.app',
	},
	{
		date: '2023-07-10',
		href: 'https://nuotsu-hlkyttey7-nuotsu.vercel.app',
	},
	{
		date: '2023-06-01',
		href: 'https://nuotsu-86qrxo1n7-nuotsu.vercel.app',
	},
	{
		date: '2023-05-14',
		href: 'https://nuotsu-j532rd3mh-nuotsu.vercel.app',
	},
]

export const writing: {
	title: string
	href: string
}[] = [
	{
		title:
			'Shopify vs Sanity + Next.js: Choosing the Right Platform for Modern Websites',
		href: 'https://typed.sanitypress.dev/blog/shopify-vs-sanity-nextjs-choosing-the-right-platform-for-modern-websites',
	},
	{
		title: 'How Sanity MCP Transformed My Coding Experiences',
		href: 'https://typed.sanitypress.dev/blog/how-sanity-mcp-transformed-my-coding-experience',
	},
	{
		title: 'Building Carousels with CSS Only',
		href: 'https://typed.sanitypress.dev/blog/building-carousels-with-css-only',
	},
	{
		title: 'Architecting Websites with Sanity',
		href: 'https://typed.sanitypress.dev/blog/architecting-websites-with-sanity',
	},
	{
		title: 'Design Smarter, Build Faster: Modular Architecture',
		href: 'https://sanitypress.dev/blog/design-smarter-build-faster-modular-architecture',
	},
]

export const testimonials: {
	quote: string
	author: {
		name: string
		title: string
	}
	source: string
}[] = [
	{
		quote:
			"This is sick dude. [...] Love seeing all the <strong>great work</strong> you're doing for <strong>the Sanity Community</strong>.",
		author: {
			name: 'Jono',
			title: 'Founder of Roboto Studio',
		},
		source:
			'https://github.com/nuotsu/sanitypress/discussions/65#discussioncomment-12237198',
	},
	{
		quote:
			'A really cool Sanity + Next.js starter template. Go check it out! 🔥 <strong>Really great work</strong>, Mitchell.',
		author: {
			name: 'Kapehe',
			title: 'Head of Developer Community @ Vercel',
		},
		source:
			'https://www.sanity.io/blog/community-digest-may-24-edition#84fd322ef040',
	},
	{
		quote:
			"Dude, Mitchell's a <em>crazy</em> dev 🤯. Check out his <strong>MLB app</strong>.",
		author: {
			name: 'Shota',
			title: 'Senior Software Engineer @ Salesforce',
		},
		source: 'https://sb3.theohtani.com',
	},
]

export const links: { label: string; href: string }[] = [
	{ label: 'GitHub', href: 'https://github.com/nuotsu' },
	{ label: 'LinkedIn', href: 'https://linkedin.com/in/nuotsu' },
	{ label: 'X', href: 'https://x.com/marutchell' },
	{ label: 'Email', href: 'mailto:mitchell@nuotsu.dev' },
	{ label: 'What\s my rate?', href: 'https://quote.nuotsu.dev' },
]
