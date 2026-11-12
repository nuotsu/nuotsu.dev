// Server-only (SvelteKit refuses to bundle anything under lib/server into client code).
// Credentials stay here; only rounded percentages leave the server.

import { CLAUDE_OAUTH_TOKEN, CODEX_ACCESS_TOKEN, CURSOR_SESSION_TOKEN } from '$app/env/private'

export type ServiceId = 'claude' | 'codex' | 'cursor' | 'grokbot'

/** percentage of the current usage window that's been used (0–100), or null if unavailable */
export type Usage = Record<ServiceId, number | null>

const TIMEOUT = 5000 // ms

async function getJson(url: string, headers: HeadersInit, init: RequestInit = {}) {
	const response = await fetch(url, { ...init, headers, signal: AbortSignal.timeout(TIMEOUT) })
	// never include the response body in errors: it could echo request details
	if (!response.ok) throw new Error(`${new URL(url).host} responded ${response.status}`)
	return response.json()
}

const percent = (value: unknown) =>
	typeof value === 'number' && Number.isFinite(value)
		? Math.min(100, Math.max(0, Math.round(value)))
		: null

// the cursor.com dashboard session powers both Cursor and Grok Bot
const cursorHeaders = () => ({
	Accept: 'application/json',
	Cookie: `WorkosCursorSessionToken=${CURSOR_SESSION_TOKEN}`,
	Origin: 'https://cursor.com',
	Referer: 'https://cursor.com/dashboard'
})

const fetchers: Record<ServiceId, () => Promise<number | null>> = {
	// Claude subscription: current 5-hour session window
	async claude() {
		if (!CLAUDE_OAUTH_TOKEN) return null
		const data = await getJson('https://api.anthropic.com/api/oauth/usage', {
			Authorization: `Bearer ${CLAUDE_OAUTH_TOKEN}`,
			'anthropic-beta': 'oauth-2025-04-20'
		})
		return percent(data?.five_hour?.utilization)
	},

	// ChatGPT/Codex plan: primary rate limit window (length depends on plan)
	async codex() {
		if (!CODEX_ACCESS_TOKEN) return null
		// the access token is a JWT that already carries the account id
		const claims = JSON.parse(
			Buffer.from(CODEX_ACCESS_TOKEN.split('.')[1] ?? '', 'base64url').toString()
		)
		const accountId = claims?.['https://api.openai.com/auth']?.chatgpt_account_id
		if (!accountId) throw new Error('CODEX_ACCESS_TOKEN has no account id claim')

		const data = await getJson('https://chatgpt.com/backend-api/wham/usage', {
			Authorization: `Bearer ${CODEX_ACCESS_TOKEN}`,
			'ChatGPT-Account-Id': accountId
		})
		return percent(data?.rate_limit?.primary_window?.used_percent)
	},

	// Cursor: included usage for the current billing cycle
	async cursor() {
		if (!CURSOR_SESSION_TOKEN) return null
		const data = await getJson('https://cursor.com/api/usage-summary', cursorHeaders())
		const plan = data?.individualUsage?.plan
		return percent(
			plan?.totalPercentUsed ?? (plan?.limit ? (plan.used / plan.limit) * 100 : undefined)
		)
	},

	// Grok Bot: weekly included allowance (or trial), read with the Cursor session
	async grokbot() {
		if (!CURSOR_SESSION_TOKEN) return null
		const data = await getJson(
			'https://cursor.com/api/dashboard/get-sand-usage-status',
			{ ...cursorHeaders(), 'Content-Type': 'application/json' },
			{ method: 'POST', body: '{}' }
		)
		const onTrial = data?.sandTrialExpiresAt && new Date(data.sandTrialExpiresAt) > new Date()
		const hasAllowance =
			typeof data?.includedLimitZero === 'boolean'
				? !data.includedLimitZero
				: !!data?.hasNonZeroIncludedLimit
		return hasAllowance || onTrial ? percent(data?.usagePercent) : null
	}
}

export async function getUsage(): Promise<Usage> {
	const ids = Object.keys(fetchers) as ServiceId[]
	const results = await Promise.allSettled(ids.map((id) => fetchers[id]()))

	return Object.fromEntries(
		results.map((result, i) => {
			if (result.status === 'rejected') {
				console.error(`[usage] ${ids[i]}:`, (result.reason as Error)?.message)
			}
			return [ids[i], result.status === 'fulfilled' ? result.value : null]
		})
	) as Usage
}
