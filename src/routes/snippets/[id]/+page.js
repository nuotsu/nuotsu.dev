import { redirect } from '@sveltejs/kit'
import snippets from '$lib/snippets/all-snippets.js'

export async function load({ params }) {
	const snippet = snippets.find(({ id }) => id === params.id)

	if (!snippet) {
		throw redirect(301, '/')
	}

	return {
		snippet,
	}
}
