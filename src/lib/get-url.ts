export default function getUrl(url: string) {
	const { hostname, pathname } = url ? new URL(url) : {}
	return (
		url &&
		[hostname?.replace('www.', ''), pathname !== '/' ? pathname : '']
			.filter(Boolean)
			.join('')
	)
}
