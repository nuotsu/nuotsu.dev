import { json } from '@sveltejs/kit'
import { GITHUB_TOKEN } from '$env/static/private'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ url }) => {
	const repo = url.searchParams.get('repo')

	const response = await fetch(
		`https://api.github.com/repos/${repo?.includes('/') ? repo : `nuotsu/${repo}`}`,
		{
			headers: {
				Accept: 'application/vnd.github.v3+json',
				Authorization: `Bearer ${GITHUB_TOKEN}`,
			},
		},
	)

	const data = await response.json()

	return json({
		stars: data.stargazers_count ?? 0,
		forks: data.forks_count ?? 0,
	})
}
