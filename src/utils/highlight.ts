import { getHighlighter } from 'shiki'

export default async function (str: string) {
	const highlighter = await getHighlighter({
		theme: '',
		langs: ['js'],
	})

	return highlighter.codeToHtml(str, { lang: 'js', theme: 'nord' })
}
