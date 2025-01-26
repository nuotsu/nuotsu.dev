import type { SanityAssetDocument } from '@sanity/client'
import type { InputValue } from '@portabletext/svelte'

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
			about?: InputValue
		}

		interface Project {
			featured: boolean
			redacted: boolean
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
