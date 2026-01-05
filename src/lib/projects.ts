import cusco from '$assets/projects/cusco.png?enhanced'
import human from '$assets/projects/human.png?enhanced'
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
		title: 'MLB Live Scorebug',
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
		// featured: true,
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
