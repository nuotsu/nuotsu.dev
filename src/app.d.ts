import type { SanityDocument, SanityAssetDocument } from '@sanity/client'
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
		interface Site extends SanityDocument {
			about?: InputValue
		}

		interface Domain extends SanityDocument {
			name: string
		}

		interface Project extends SanityDocument {
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

		interface Writing extends SanityDocument {
			title: string
			date: string
			url: string
		}

		interface Image extends SanityAssetDocument {}
	}
}

export {}
