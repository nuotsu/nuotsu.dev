import type { Handle } from '@sveltejs/kit/hooks'

// reverse proxy PostHog through /ingest so ad blockers don't drop events
export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url
	if (!pathname.startsWith('/ingest')) return resolve(event)

	const path = pathname.slice('/ingest'.length)
	const host = path.startsWith('/static') ? 'us-assets.i.posthog.com' : 'us.i.posthog.com'

	const headers = new Headers(event.request.headers)
	headers.set('host', host)
	headers.delete('cookie')
	headers.delete('accept-encoding')

	const clientIp = event.getClientAddress()
	if (clientIp) headers.set('x-forwarded-for', clientIp)

	const response = await fetch(`https://${host}${path}${event.url.search}`, {
		method: event.request.method,
		headers,
		body: event.request.body,
		// @ts-expect-error - required by undici when streaming a request body
		duplex: 'half'
	})

	const responseHeaders = new Headers(response.headers)
	responseHeaders.delete('content-encoding')
	responseHeaders.delete('content-length')

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: responseHeaders
	})
}
