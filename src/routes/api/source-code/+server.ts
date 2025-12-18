import type { RequestHandler } from './$types'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const GET: RequestHandler = async ({ url }) => {
	const file = url.searchParams.get('file')

	const filePath = join(process.cwd(), file!)
	const code = await readFile(filePath, 'utf-8')

	console.log({ filePath, code })

	return new Response(JSON.stringify(code), {
		headers: { 'Content-Type': 'application/json' },
	})
}
