import { type ServerLoad } from '@sveltejs/kit'
import { client, groq } from '$utils/sanity'

export const load: ServerLoad = async () => {
	const projects = await client.fetch<Sanity.Project[]>(
		groq`*[_type == 'project']|order(startDate desc)`,
	)

	return {
		projects,
	}
}
