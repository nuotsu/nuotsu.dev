import { client, groq } from '$utils/sanity'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	return {
		projects: await client.fetch<Sanity.Project[]>(
			groq`*[_type == 'project']|order(startDate desc)`,
		),
	}
}
