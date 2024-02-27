import { error, type ServerLoad } from '@sveltejs/kit'
import { client, groq } from '$utils/sanity'

export const load: ServerLoad = async ({ params }) => {
	const project = await client.fetch<Sanity.Project>(
		groq`
			*[_type == 'project' && id.current == $id][0]
		`,
		{
			id: params.id,
		},
	)

	if (!project) error(404, 'Project not found')

	return {
		project,
	}
}
