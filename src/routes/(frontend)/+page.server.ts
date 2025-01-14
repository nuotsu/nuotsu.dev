import { fetchSanity, groq } from '@/sanity/lib/fetch'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const projects = await fetchSanity<Sanity.Project[]>({
		query: groq`*[_type == 'project' && !hidden]|order(featured desc, startDate desc)`,
	})

	const processedProjects = await Promise.all(
		projects.map(async (project) => {
			if (!project.repo) {
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
		projects: processedProjects.sort((a, b) => b.stargazers - a.stargazers),
	}
}
