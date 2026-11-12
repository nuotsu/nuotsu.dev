import type { RequestHandler } from './$types'

// echo the visitor's own IP back to them; nothing is stored
export const GET: RequestHandler = ({ getClientAddress }) =>
	Response.json(
		{ ip: getClientAddress().replace(/^::ffff:/, '') },
		{ headers: { 'cache-control': 'private, no-store' } }
	)
