import { SITE } from '#lib/site.ts'
import type { RequestHandler } from './$types'

export const prerender = true

export const GET: RequestHandler = () =>
	new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url><loc>${SITE}</loc></url>
</urlset>
`,
		{ headers: { 'content-type': 'application/xml' } }
	)
