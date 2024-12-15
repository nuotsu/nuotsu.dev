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
			emoji: string
			japanese?: string
			id: { current: string }
			url: string
			repo?: string
			startDate: string
		}

		interface Midjourney {
			title: string
			image: SanityAssetDocument
		}
	}
}

export {}
