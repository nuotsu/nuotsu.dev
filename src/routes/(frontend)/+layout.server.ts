import groq from 'groq'
import { client } from '$lib/server/sanity/client'
import type { LayoutServerLoad } from './$types'
import type { LAYOUT_QUERYResult } from '@/sanity/types'

export const load: LayoutServerLoad = async () => {
	const LAYOUT_QUERY = groq`{
		'site': *[_type == 'site'][0],
		'projects': *[_type == 'project']|order(orderRank),
	}`

	const { site, projects } = await client.fetch<LAYOUT_QUERYResult>(LAYOUT_QUERY)

	return {
		site,
		projects,
	}
}
