import { fetchSanity, groq } from '@/sanity/lib/fetch'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const projects = await fetchSanity<Sanity.Project[]>({
		query: groq`*[_type == "project"]|order(featured desc, startDate desc)`,
	})

	return { projects }
}
