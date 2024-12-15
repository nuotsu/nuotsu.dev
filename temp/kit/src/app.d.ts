// See https://kit.svelte.dev/docs/types#app

import type { SanityAssetDocument } from '@sanity/client'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace Sanity {
		type Project = {
			hidden: boolean
			featured: boolean
			title: string
			emoji: string
			japanese?: string
			id: { current: string }
			url: string
			repo?: string
			startDate: string
		}

		type Midjourney = {
			title: string
			image: SanityAssetDocument
		}
	}
}

export {}
