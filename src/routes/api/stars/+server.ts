import { GITHUB_TOKEN } from '$app/env/private'
import type { RequestHandler } from './$types'

const normalizeRepo = (repo: string) => (repo.includes('/') ? repo : `nuotsu/${repo}`)

export const GET: RequestHandler = async ({ url }) => {
	const repoParam = url.searchParams.get('repo')

	if (!repoParam) {
		return Response.json({ stars: 0 })
	}

	const repos = repoParam
		.split(',')
		.map((repo) => repo.trim())
		.filter(Boolean)

	const headers: HeadersInit = {
		Accept: 'application/vnd.github.v3+json',
		'User-Agent': 'nuotsu.dev'
	}

	if (GITHUB_TOKEN) {
		headers.Authorization = `Bearer ${GITHUB_TOKEN}`
	}

	const counts = await Promise.all(
		repos.map(async (repo) => {
			const response = await fetch(`https://api.github.com/repos/${normalizeRepo(repo)}`, {
				headers
			})

			if (!response.ok) return 0

			const data: { stargazers_count?: number } = await response.json()
			return data.stargazers_count ?? 0
		})
	)

	return Response.json(
		{ stars: counts.reduce((sum, count) => sum + count, 0) },
		{ headers: { 'cache-control': 'public, max-age=3600' } }
	)
}
