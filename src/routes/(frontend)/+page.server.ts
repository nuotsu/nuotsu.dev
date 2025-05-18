import { client } from '$lib/server/sanity/client'
import groq from 'groq'
import type { PageServerLoad } from './$types'
import type { PAGE_QUERYResult } from '@@/src/sanity/types'

export const load: PageServerLoad = async () => {
	const PAGE_QUERY = groq`{
		'site': *[_type == 'site'][0],
		'projects': *[_type == 'project']|order(startDate desc),
	}`

	const { site, projects } = await client.fetch<PAGE_QUERYResult>(PAGE_QUERY)

	return {
		site,
		projects,
	}
}
