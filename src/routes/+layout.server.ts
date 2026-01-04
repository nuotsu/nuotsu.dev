import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ fetch }) => {
	const viewsResponse = await fetch('/api/views')
	const { views } = (await viewsResponse.json()) satisfies App.ViewsResponse

	return { views }
}
