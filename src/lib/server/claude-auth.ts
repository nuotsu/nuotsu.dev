// Server-only. Keeps a Claude OAuth access token fresh for /api/usage.
//
// Refresh tokens rotate: every refresh returns a new one and invalidates the old one.
// The latest pair is stored in Redis so every serverless instance (and local dev, when it
// points at the same store) shares it. A short lock keeps two instances from refreshing at
// once, which would spend the same refresh token twice.

import { CLAUDE_REFRESH_TOKEN, KV_REST_API_TOKEN, KV_REST_API_URL } from '$app/env/private'

const TOKEN_URL = 'https://platform.claude.com/v1/oauth/token'
const CLIENT_ID = '9d1c250a-e61b-44d9-88ed-5944d1962f5e' // Claude Code's public OAuth client
const KEY = 'claude-oauth'
const LOCK_KEY = `${KEY}:lock`
const EARLY = 5 * 60_000 // refresh this long before the access token expires
const TIMEOUT = 5000 // ms

type Tokens = {
	accessToken: string
	refreshToken: string
	expiresAt: number // epoch ms
	/** the CLAUDE_REFRESH_TOKEN this chain started from; a new env value restarts the chain */
	seed: string
}

let memory: Tokens | null = null

async function redis<T = unknown>(...command: (string | number)[]): Promise<T> {
	const response = await fetch(KV_REST_API_URL!, {
		method: 'POST',
		headers: { Authorization: `Bearer ${KV_REST_API_TOKEN}` },
		body: JSON.stringify(command),
		signal: AbortSignal.timeout(TIMEOUT)
	})
	if (!response.ok) throw new Error(`redis responded ${response.status}`)
	return (await response.json()).result as T
}

async function load(): Promise<Tokens | null> {
	const raw = await redis<string | null>('GET', KEY)
	return raw ? (JSON.parse(raw) as Tokens) : null
}

const fresh = (tokens: Tokens | null): boolean =>
	!!tokens && tokens.seed === CLAUDE_REFRESH_TOKEN && tokens.expiresAt - EARLY > Date.now()

async function refresh(refreshToken: string): Promise<Tokens> {
	const response = await fetch(TOKEN_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			grant_type: 'refresh_token',
			refresh_token: refreshToken,
			client_id: CLIENT_ID
		}),
		signal: AbortSignal.timeout(TIMEOUT)
	})
	// never include the response body in errors: it could echo the token
	if (!response.ok) throw new Error(`claude token refresh responded ${response.status}`)
	const data = await response.json()
	if (!data?.access_token) throw new Error('claude token refresh returned no access token')
	return {
		accessToken: data.access_token,
		refreshToken: data.refresh_token ?? refreshToken,
		expiresAt: Date.now() + (Number(data.expires_in) || 3600) * 1000,
		seed: CLAUDE_REFRESH_TOKEN!
	}
}

/** a valid access token, or null when not configured */
export async function getClaudeAccessToken(): Promise<string | null> {
	if (!CLAUDE_REFRESH_TOKEN) {
		console.error('[usage] Missing CLAUDE_REFRESH_TOKEN; configure it in this deployment')
		return null
	}
	// without shared storage a rotated refresh token would be lost on the next cold start
	if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
		console.error(
			'[usage] Missing KV_REST_API_URL/KV_REST_API_TOKEN; needed to store Claude tokens'
		)
		return null
	}

	if (memory && fresh(memory)) return memory.accessToken

	const stored = await load()
	if (stored && fresh(stored)) return (memory = stored).accessToken

	// someone else may be refreshing right now: wait for their result instead
	const locked = await redis<string | null>('SET', LOCK_KEY, '1', 'NX', 'PX', 15_000)
	if (!locked) {
		await new Promise((resolve) => setTimeout(resolve, 2000))
		const after = await load()
		if (after && fresh(after)) return (memory = after).accessToken
		throw new Error('claude token refresh is in progress elsewhere')
	}

	try {
		// re-read under the lock in case a refresh finished between the GET and the SET
		const current = await load()
		if (current && fresh(current)) return (memory = current).accessToken

		const chain =
			current?.seed === CLAUDE_REFRESH_TOKEN ? current.refreshToken : CLAUDE_REFRESH_TOKEN
		const next = await refresh(chain)
		await redis('SET', KEY, JSON.stringify(next))
		return (memory = next).accessToken
	} finally {
		await redis('DEL', LOCK_KEY).catch(() => {})
	}
}

/** call when the access token was rejected so the next request refreshes it */
export async function expireClaudeAccessToken() {
	memory = null
	const stored = await load().catch(() => null)
	if (stored) await redis('SET', KEY, JSON.stringify({ ...stored, expiresAt: 0 })).catch(() => {})
}
