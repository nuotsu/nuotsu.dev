import groq from 'groq'
import { client } from '@/sanity/lib/client'
import type { LayoutServerLoad } from './$types'
import type { LAYOUT_QUERYResult } from '@/sanity/types'

export const load: LayoutServerLoad = async () => {
	const LAYOUT_QUERY = groq`{
		'global': *[_type == 'global'][0]{
			...,
			pokemonTeams[!hidden],
		},
		'projects': *[_type == 'project' && defined(url)],
		'domains': *[_type == 'domain'],
		'testimonials': *[_type == 'testimonial'],
	}`

	const data = await client.fetch<LAYOUT_QUERYResult>(LAYOUT_QUERY)

	return data
}
