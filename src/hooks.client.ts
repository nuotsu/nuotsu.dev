import { PUBLIC_POSTHOG_TOKEN } from '$app/env/public'
import type { ClientInit, HandleClientError } from '@sveltejs/kit/hooks'
import posthog from 'posthog-js'

export const init: ClientInit = () => {
	if (!PUBLIC_POSTHOG_TOKEN) return

	posthog.init(PUBLIC_POSTHOG_TOKEN, {
		api_host: '/ingest',
		ui_host: 'https://us.posthog.com',
		defaults: 'latest',
		capture_exceptions: true
	})
}

// report unexpected errors (not 404s or intentional `error()`s); SvelteKit's default response is kept
export const handleError: HandleClientError = ({ kind, error }) => {
	if (kind === 'unknown') posthog.captureException(error)
}
