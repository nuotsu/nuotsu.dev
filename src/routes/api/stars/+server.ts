import { json } from '@sveltejs/kit'
import { GITHUB_TOKEN } from '$env/static/private'
import type { RequestHandler } from './$types'

const normalizeRepo = (repo: string) =>
	repo.includes('/') ? repo : `nuotsu/${repo}`

export const GET: RequestHandler = async ({ url }) => {
	const repoParam = url.searchParams.get('repo')

	if (!repoParam) {
		return json({ stars: 0 })
	}

	const repos = repoParam
		.split(',')
		.map((r) => r.trim())
		.filter(Boolean)

	const counts = await Promise.all(
		repos.map(async (repo) => {
			const response = await fetch(
				`https://api.github.com/repos/${normalizeRepo(repo)}`,
				{
					headers: {
						Accept: 'application/vnd.github.v3+json',
						Authorization: `Bearer ${GITHUB_TOKEN}`,
					},
				},
			)

			const data = await response.json()
			return (data.stargazers_count as number | undefined) ?? 0
		}),
	)

	return json({
		stars: counts.reduce((sum, count) => sum + count, 0),
	})
}
