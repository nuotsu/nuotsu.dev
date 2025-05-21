import groq from 'groq'
import { client } from '$lib/server/sanity/client'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
	const PROJECT_PAGE_QUERY = groq`
    *[_type == 'project' && metadata.slug.current == $slug][0]
  `

	const project = await client.fetch(PROJECT_PAGE_QUERY, params)

	return {
		project,
	}
}
