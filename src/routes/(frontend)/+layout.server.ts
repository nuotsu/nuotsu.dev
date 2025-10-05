import groq from 'groq'
import { client } from '@/sanity/lib/client'
import type { LayoutServerLoad } from './$types'
import type { LAYOUT_QUERYResult } from '@/sanity/types'

export const load: LayoutServerLoad = async () => {
	const LAYOUT_QUERY = groq`{
		'global': *[_type == 'global'][0]{
			...,
			featuredProjects[]->
		},
		'projects': *[_type == 'project'],
		'domains': *[_type == 'domain'],
	}`

	const { global } = await client.fetch<LAYOUT_QUERYResult>(LAYOUT_QUERY)

	return {
		global,
	}
}
