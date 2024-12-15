import { client } from './client'
import type { QueryParams } from 'sanity'

export { default as groq } from 'groq'

export async function fetchSanity<T = unknown>({
	query,
	params = {},
}: {
	query: string
	params?: Partial<QueryParams>
}) {
	return await client.fetch<T>(query, params)
}
