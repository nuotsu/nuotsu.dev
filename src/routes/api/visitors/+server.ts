import { getVisitors } from '#lib/server/visitors.ts'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
	const visitors = await getVisitors()
	return Response.json(
		{ visitors },
		{
			// cache at the edge so every page load doesn't run a PostHog query
			headers: {
				'cache-control':
					visitors === null
						? 'no-store'
						: 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
			}
		}
	)
}
