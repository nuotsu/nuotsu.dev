import { createClient } from '@sanity/client'
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$env/static/public'
import { SANITY_API_READ_TOKEN } from '$env/static/private'
import { dev } from '$app/environment'

export const client = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	apiVersion: '2025-05-05',
	stega: {
		studioUrl: '/admin',
	},
	...(dev
		? {
				useCdn: false,
				token: SANITY_API_READ_TOKEN,
				perspective: 'drafts',
			}
		: {
				useCdn: true,
				perspective: 'published',
			}),
})
