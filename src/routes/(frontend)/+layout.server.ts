import { fetchSanity, groq } from '@/sanity/lib/fetch'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const site = await fetchSanity<Sanity.Site>({
		query: groq`*[_type == 'site'][0]`,
	})

	return {
		site,
	}
}
