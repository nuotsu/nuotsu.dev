import type { SanityDocument } from '@sanity/client'

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			projects: Sanity.Project[]
		}
		// interface PageState {}
		// interface Platform {}
	}

	namespace Sanity {
		type Project = SanityDocument & {
			title: string
			emoji?: string
			id: { current: string }
			url: string
			startDate: string
		}
	}
}

export {}
