import type { Picture } from '@sveltejs/enhanced-img'
import cssdaBestInn from '$assets/awards/cssda-best-inn.png?enhanced'
import cssdaBestUi from '$assets/awards/cssda-best-ui.png?enhanced'
import cssdaBestUx from '$assets/awards/cssda-best-ux.png?enhanced'
import cssdaSpecialKudos from '$assets/awards/cssda-special-kudos.png?enhanced'
import cusco from '$assets/projects/cusco.png?enhanced'
import human from '$assets/projects/human.png?enhanced'
import mlb from '$assets/projects/mlb.png?enhanced'
import sanitypressWithTypegen from '$assets/projects/sanitypress-with-typegen.png?enhanced'
import sanitypress from '$assets/projects/sanitypress.png?enhanced'
import sb3 from '$assets/projects/sb3.png?enhanced'
import theOhtani from '$assets/projects/theohtani.png?enhanced'

export const projects: {
	featured?: true
	title: string
	year?: number
	href: string
	repo?: string
	client?: true
	image?: Picture
	tags?: string[]
	awards?: {
		title: string
		images?: Picture[]
	}
}[] = [
	{
		featured: true,
		title: 'SanityPress with Typegen',
		year: 2025,
		href: 'https://typed.sanitypress.dev',
		image: sanitypressWithTypegen,
		repo: 'sanitypress-with-typegen',
		tags: ['Next.js', 'Sanity', 'TypeScript', 'Tailwind']
	},
	{
		// featured: true,
		title: 'SanityPress',
		year: 2024,
		href: 'https://github.com/nuotsu/sanitypress',
		image: sanitypress,
		repo: 'sanitypress'
	},
	{
		featured: true,
		title: 'MLB Live Scorebug',
		href: 'https://mlb.theohtani.com',
		year: 2026,
		image: mlb,
		repo: 'mlb',
		tags: ['SvelteKit', 'MLB API', 'Tailwind'],
		awards: {
			title: 'CSS Design Awards: Best UI+UX+Inn & Special Kudos',
			images: [cssdaBestUi, cssdaBestUx, cssdaBestInn, cssdaSpecialKudos]
		}
	},
	// {
	// 	title: 'MLB Live Scorebug',
	// 	year: 2025,
	// 	href: 'https://sb3.theohtani.com',
	// 	image: sb3,
	// 	repo: 'sb3.theohtani.com'
	// },
	{
		featured: true,
		title: 'The Ohtani',
		href: 'https://theohtani.com',
		image: theOhtani,
		repo: 'theohtani.com',
		tags: ['SvelteKit', 'GSAP', 'Tailwind']
	},
	// {
	// 	title: 'SvelteKit + Sanity template ',
	// 	href: 'https://github.com/nuotsu/sveltekit-sanity',
	// 	repo: 'sveltekit-sanity'
	// },
	{
		title: 'things',
		href: 'https://things.nuotsu.dev',
		repo: 'things.nuotsu.dev'
	},
	{ title: 'ic0n.dev', href: 'https://ic0n.dev', repo: 'ic0n.dev' },
	// {
	// 	title: 'GitHub iframe',
	// 	href: 'https://github-iframe.vercel.app',
	// 	repo: 'github-iframe'
	// },
	// {
	// 	title: 'Numeration',
	// 	href: 'https://numeration.vercel.app',
	// 	repo: 'numeration'
	// },
	// {
	// 	title: 'One Piece Chapters',
	// 	href: 'https://onepiece-chapters.vercel.app',
	// 	repo: 'onepiece-chapters',
	// },
	{
		title: 'Timeless Shopify Theme',
		href: 'https://timeless-docs.vercel.app',
		repo: 'timeless-shopify-theme'
	},
	{
		title: 'Shopify App Comparer',
		href: 'https://shopify-compare.vercel.app',
		repo: 'mitchuman/shopify-compare-apps'
	},
	{
		title: 'Midjourney',
		href: 'https://www.midjourney.com/@nuotsu'
	},
	{
		// featured: true,
		title: 'human.marketing',
		href: 'https://human.marketing',
		client: true,
		image: human
	},
	{
		// featured: true,
		title: 'CUSCO USA',
		href: 'https://cuscousainc.com',
		client: true,
		image: cusco
	},
	{
		title: 'ECL Americas',
		href: 'https://eclamericas.com',
		client: true
	},
	{
		title: 'Attention Monsters',
		href: 'https://attentionmonsters.com',
		client: true
	}
] as const
