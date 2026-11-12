import { getUsage } from '#lib/server/usage.ts'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
	const usage = await getUsage()
	const complete = Object.values(usage).every((value) => value !== null)
	return Response.json(usage, {
		// cache at the edge so visitors can't hammer the upstream APIs with your tokens
		headers: {
			'cache-control': complete
				? 'public, max-age=60, s-maxage=300, stale-while-revalidate=600'
				: 'no-store'
		}
	})
}
