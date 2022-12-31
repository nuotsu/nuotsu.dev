import client from '$utils/sanity'
import groq from 'groq'

export async function load() {
	return await client.fetch(groq`{
		'works': *[_type == 'work']|order(date desc)
	}`)
}
