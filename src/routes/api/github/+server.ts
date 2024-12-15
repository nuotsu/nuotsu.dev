import { Octokit } from 'octokit'
import { GITHUB_TOKEN } from '$env/static/private'
import type { RequestHandler } from './$types'

const octokit = new Octokit({ auth: GITHUB_TOKEN })

export const GET: RequestHandler = async ({ url }) => {
	const [owner, repo] = url.searchParams.get('repo')?.split('/') ?? []

	const { data } = await octokit.rest.repos.get({ owner, repo })

	return new Response(
		JSON.stringify({ stargazers: data.stargazers_count, forks: data.forks }),
	)
}
