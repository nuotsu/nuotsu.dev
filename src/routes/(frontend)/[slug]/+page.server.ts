import groq from 'groq'
import { client } from '$lib/server/sanity/client'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { PROJECT_PAGE_QUERYResult } from '@/sanity/types'

export const load: PageServerLoad = async ({ params }) => {
	const PROJECT_PAGE_QUERY = groq`
		*[_type == 'project' && metadata.slug.current == $slug][0]
	`

	const project = await client.fetch<PROJECT_PAGE_QUERYResult>(PROJECT_PAGE_QUERY, params)

	if (!project) {
		error(404, 'Project not found')
	}

	return {
		project,
	}
}
