import type { RequestHandler } from './$types'
// @ts-ignore
import { readFile } from 'node:fs/promises'

export const GET: RequestHandler = async ({ url }) => {
	const file = url.searchParams.get('file')

	const code = await readFile(file, 'utf-8')

	return new Response(JSON.stringify(code))
}
