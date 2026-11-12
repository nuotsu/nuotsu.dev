import { defineEnvVars } from '@sveltejs/kit/env'

// all private (server-only) and optional: a missing value makes the feature fall back gracefully
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
	}
})
