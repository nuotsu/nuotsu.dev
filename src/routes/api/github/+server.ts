import { Octokit } from 'octokit'
import { GITHUB_TOKEN } from '$env/static/private'
import { json } from '@sveltejs/kit'
import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

const octokit = new Octokit({ auth: GITHUB_TOKEN })

export const GET: RequestHandler = async ({ url }) => {
	const [owner, repo] = url.searchParams.get('repo')?.split('/') ?? []

	try {
		const { data } = await octokit.rest.repos.get({ owner, repo })

		return json({
			stargazers: data.stargazers_count,
			forks: data.forks,
		})
	} catch (e: any) {
		return error(e.status, e.message)
	}
}
