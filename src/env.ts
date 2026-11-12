import { defineEnvVars } from '@sveltejs/kit/env'

// all optional: a missing value makes the feature fall back gracefully
const optional = (value: string | undefined) => value || undefined

export const variables = defineEnvVars({
	GITHUB_TOKEN: {
		schema: optional,
		description: 'GitHub token for higher rate limits on /api/stars'
	},
	CLAUDE_OAUTH_TOKEN: {
		schema: optional,
		description: 'Claude OAuth access token for /api/usage'
	},
	CODEX_ACCESS_TOKEN: {
		schema: optional,
		description: 'ChatGPT/Codex access token for /api/usage'
	},
	CURSOR_SESSION_TOKEN: {
		schema: optional,
		description: 'Cursor WorkosCursorSessionToken cookie for /api/usage'
	},
	PUBLIC_POSTHOG_TOKEN: {
		public: true,
		static: true,
		schema: optional,
		description: 'PostHog project token (phc_…) for client-side analytics'
	},
	POSTHOG_PERSONAL_API_KEY: {
		schema: optional,
		description: 'PostHog personal API key (phx_…) with query:read scope for /api/visitors'
	}
})
