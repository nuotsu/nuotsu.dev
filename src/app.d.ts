import type { SanityAssetDocument } from '@sanity/client'

// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace Sanity {
		interface Site {
			hero: {
				desktop: Image
				mobile: Image
			}
		}

		interface Project {
			featured: boolean
			client: boolean
			hidden: boolean
			title: string
			id: { current: string }
			emoji: string
			url: string
			repo?: string
			startDate: string

			stargazers?: number
			forks?: number
		}

		interface Image extends SanityAssetDocument {}
	}
}

export {}
