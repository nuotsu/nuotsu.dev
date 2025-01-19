import { fetchSanity, groq } from '@/sanity/lib/fetch'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const projects = await fetchSanity<Sanity.Project[]>({
		query: groq`*[_type == 'project']|order(startDate desc)`,
	})

	const processedProjects = await Promise.all(
		projects.map(async (project) => {
			if (!project.repo || project.hidden) {
				return project
			}

			const res = await fetch(url.origin + `/api/github?repo=${project.repo}`)
			const { stargazers, forks } = await res.json()

			return {
				...project,
				...(project.repo ? { stargazers, forks } : {}),
			}
		}),
	)

	return {
		projects: processedProjects,
	}
}
