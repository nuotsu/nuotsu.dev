import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url, fetch }) => {
	const file = url.searchParams.get('file')

	if (!file) {
		return new Response(JSON.stringify({ error: 'File path is required' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		})
	}

	const rawUrl = `https://raw.githubusercontent.com/nuotsu/nuotsu.dev/thirty/${file}`
	const response = await fetch(rawUrl)

	if (!response.ok) {
		return new Response(JSON.stringify({ error: 'File not found' }), {
			status: response.status,
			headers: { 'Content-Type': 'application/json' },
		})
	}

	const fileContent = await response.text()
	return new Response(JSON.stringify(fileContent), {
		headers: { 'Content-Type': 'application/json' },
	})
}
