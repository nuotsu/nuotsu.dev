import type { SanityDocument, SanityAssetDocument } from '@sanity/client'
import type { InputValue } from '@portabletext/svelte'
import type { LayoutData } from './routes/(frontend)/$types'

// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData extends LayoutData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}
