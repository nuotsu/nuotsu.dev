import { json } from '@sveltejs/kit'
import { POSTHOG_API_KEY } from '$env/static/private'
import { PUBLIC_POSTHOG_HOST } from '$env/static/public'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () => {
	const response = await fetch(`${PUBLIC_POSTHOG_HOST}/api/projects/268828/query/`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${POSTHOG_API_KEY}`, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: {
				kind: 'HogQLQuery',
				query: `SELECT count() AS total_page_views FROM events WHERE event = '$pageview'`,
			},
		}),
	})
	const data = await response.json()
	const visitors = data.results?.[0]?.[0] ?? 0
	return json({ visitors })
}
