import { client, groq } from '@/utils/sanity'

export async function load() {
	const projects = await client.fetch<Sanity.Project[]>(
		groq`*[_type == "project"]|order(!featured, startDate desc)`,
	)

	return {
		projects,
	}
}
