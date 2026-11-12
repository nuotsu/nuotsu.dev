import { getUsage } from '#lib/server/usage.ts'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () =>
	Response.json(await getUsage(), {
		// cache at the edge so visitors can't hammer the upstream APIs with your tokens
		headers: {
			'cache-control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600'
		}
	})
