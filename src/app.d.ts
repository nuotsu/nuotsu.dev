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
		interface Project {
			hidden: boolean
			featured: boolean
			title: string
			id: { current: string }
			emoji: string
			url: string
			repo?: string
			startDate: string
		}

		interface Midjourney {
			title: string
			image: Image
		}

		interface Image extends SanityAssetDocument {}
	}
}

export {}
