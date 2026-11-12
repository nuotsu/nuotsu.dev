import { POSTHOG_PERSONAL_API_KEY } from '$app/env/private'

const POSTHOG_PROJECT_ID = 268828

// all-time unique visitors, excluding local development
const QUERY = `
	SELECT count(DISTINCT person_id)
	FROM events
	WHERE event = '$pageview'
		AND properties.$host NOT IN ('localhost', '127.0.0.1')
		AND properties.$host NOT LIKE 'localhost:%'
		AND properties.$host NOT LIKE '127.0.0.1:%'
`

export async function getVisitors(): Promise<number | null> {
	if (!POSTHOG_PERSONAL_API_KEY) return null

	try {
		const response = await fetch(
			`https://us.posthog.com/api/projects/${POSTHOG_PROJECT_ID}/query/`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${POSTHOG_PERSONAL_API_KEY}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: { kind: 'HogQLQuery', query: QUERY },
					name: 'nuotsu.dev visitors'
				})
			}
		)

		if (!response.ok) return null

		const data: { results?: [[number]] } = await response.json()
		return data.results?.[0]?.[0] ?? null
	} catch {
		return null
	}
}
