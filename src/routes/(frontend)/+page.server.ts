import { client } from '$lib/server/sanity/client'
import groq from 'groq'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const PAGE_QUERY = groq`{
		'site': *[_type == 'site'][0],
		'projects': *[_type == 'project']|order(startDate desc),
		'writings': *[_type == 'writing']|order(date desc),
		'domains': *[_type == 'domain']|order(name asc)
	}`

	const data = await client.fetch(PAGE_QUERY)

	return {
		...data,
	}
}
