import { client, groq } from '@/utils/sanity'

export async function load() {
	const midjourney = await client.fetch<Sanity.Midjourney[]>(
		groq`*[_type == "midjourney"]|order(orderRank)`,
	)

	return {
		midjourney,
	}
}
