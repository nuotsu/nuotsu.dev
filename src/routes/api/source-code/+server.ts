import type { RequestHandler } from './$types'

const BRANCH = '2026-jan'

export const GET: RequestHandler = async ({ url, fetch }) => {
	const file = url.searchParams.get('file')
	const lines = Number(url.searchParams.get('lines') ?? 0)

	const response = await fetch(
		`https://raw.githubusercontent.com/nuotsu/nuotsu.dev/${BRANCH}/${file}`,
	)

	const code = await response.text()
	const c = lines ? code.split('\n').slice(0, lines).join('\n') : code

	return new Response(c, {
		headers: { 'Content-Type': 'text/plain' },
	})
}
