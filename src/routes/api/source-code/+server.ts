import type { RequestHandler } from './$types'

const BRANCH = '2026-jan'

export const GET: RequestHandler = async ({ url, fetch }) => {
	const file = url.searchParams.get('file')

	const response = await fetch(
		`https://raw.githubusercontent.com/nuotsu/nuotsu.dev/${BRANCH}/${file}`,
	)

	const fileContent = await response.text()

	return new Response(JSON.stringify(fileContent), {
		headers: { 'Content-Type': 'application/json' },
	})
}
