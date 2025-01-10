import { fetchSanity, groq } from '@/sanity/lib/fetch'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const { projects, midjourney } = await fetchSanity<{
		projects: Sanity.Project[]
		midjourney: Sanity.Midjourney[]
	}>({
		query: groq`{
			'projects': *[_type == 'project']|order(featured desc, startDate desc),
			'midjourney': *[_type == 'midjourney']
		}`,
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
		projects: processedProjects,
		midjourney,
	}
}
