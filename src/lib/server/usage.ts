// Server-only (SvelteKit refuses to bundle anything under lib/server into client code).
// Credentials stay here; only rounded percentages leave the server.

import { CODEX_ACCESS_TOKEN, CURSOR_SESSION_TOKEN } from '$app/env/private'
import { expireClaudeAccessToken, getClaudeAccessToken } from './claude-auth.ts'

export type ServiceId = 'claude' | 'codex' | 'cursor' | 'grokbot'

/** percentage of the current usage window that's been used (0–100), or null if unavailable */
export type Usage = Record<ServiceId, number | null>

const TIMEOUT = 5000 // ms
const TTL = 5 * 60_000 // ms to reuse a successful result before asking the service again

/** thrown on 429 so the service can be left alone until it says to come back */
class RateLimitError extends Error {
	constructor(
		host: string,
		readonly retryAfter: number // ms
	) {
		super(`${host} rate limited for ${Math.round(retryAfter / 1000)}s`)
	}
}

function hasToken(name: string, value: string | undefined): value is string {
	if (value) return true
	console.error(`[usage] Missing ${name}; configure it in this deployment's environment`)
	return false
}

async function getJson(url: string, headers: HeadersInit, init: RequestInit = {}) {
	const response = await fetch(url, { ...init, headers, signal: AbortSignal.timeout(TIMEOUT) })
	if (response.status === 429) {
		const seconds = Number(response.headers.get('retry-after'))
		throw new RateLimitError(
			new URL(url).host,
			(Number.isFinite(seconds) && seconds > 0 ? seconds : 60) * 1000
		)
	}
	// never include the response body in errors: it could echo request details
	if (!response.ok)
		throw Object.assign(new Error(`${new URL(url).host} responded ${response.status}`), {
			status: response.status
		})
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
	// Claude subscription: weekly (7-day) limit across all models
	async claude() {
		const token = await getClaudeAccessToken()
		if (!token) return null
		try {
			const data = await getJson('https://api.anthropic.com/api/oauth/usage', {
				Authorization: `Bearer ${token}`,
				'anthropic-beta': 'oauth-2025-04-20'
			})
			return percent(data?.seven_day?.utilization)
		} catch (error) {
			// rejected token: make the next attempt refresh it
			if ((error as { status?: number }).status === 401) await expireClaudeAccessToken()
			throw error
		}
	},

	// ChatGPT/Codex plan: the longest rate limit window (usually weekly)
	async codex() {
		if (!hasToken('CODEX_ACCESS_TOKEN', CODEX_ACCESS_TOKEN)) return null
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
		// plans report a short primary window plus a longer secondary one, or only one window
		type Window = { used_percent?: number; limit_window_seconds?: number } | null | undefined
		const windows = [data?.rate_limit?.primary_window, data?.rate_limit?.secondary_window]
		const longest = (windows as Window[])
			.filter((window) => window)
			.sort((a, b) => (b!.limit_window_seconds ?? 0) - (a!.limit_window_seconds ?? 0))[0]
		return percent(longest?.used_percent)
	},

	// Cursor: included usage for the current billing cycle
	async cursor() {
		if (!hasToken('CURSOR_SESSION_TOKEN', CURSOR_SESSION_TOKEN)) return null
		const data = await getJson('https://cursor.com/api/usage-summary', cursorHeaders())
		const plan = data?.individualUsage?.plan
		return percent(
			plan?.totalPercentUsed ?? (plan?.limit ? (plan.used / plan.limit) * 100 : undefined)
		)
	},

	// Grok Bot: weekly included allowance (or trial), read with the Cursor session
	async grokbot() {
		if (!hasToken('CURSOR_SESSION_TOKEN', CURSOR_SESSION_TOKEN)) return null
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

// in-memory, per server instance: survives between requests while the instance stays warm
const cache = new Map<ServiceId, { value: number | null; at: number }>()
const blockedUntil = new Map<ServiceId, number>()

async function getServiceUsage(id: ServiceId): Promise<number | null> {
	const now = Date.now()
	const cached = cache.get(id)

	if (cached && now - cached.at < TTL) return cached.value
	if ((blockedUntil.get(id) ?? 0) > now) return cached?.value ?? null

	try {
		const value = await fetchers[id]()
		cache.set(id, { value, at: now })
		return value
	} catch (error) {
		// back off on any failure so a broken token doesn't hit the API on every page view
		blockedUntil.set(id, now + (error instanceof RateLimitError ? error.retryAfter : TTL))
		console.error(`[usage] ${id}:`, (error as Error)?.message)
		// keep showing the last good value rather than nothing
		return cached?.value ?? null
	}
}

export async function getUsage(): Promise<Usage> {
	const ids = Object.keys(fetchers) as ServiceId[]
	const values = await Promise.all(ids.map(getServiceUsage))
	return Object.fromEntries(ids.map((id, i) => [id, values[i]])) as Usage
}
