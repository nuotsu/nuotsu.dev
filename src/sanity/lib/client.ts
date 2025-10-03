import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion } from './env'
import { SANITY_API_READ_TOKEN } from '$env/static/private'
import { dev } from '$app/environment'

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
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
