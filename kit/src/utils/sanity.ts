import { createClient } from '@sanity/client'
import { dev } from '$app/environment'

export { default as groq } from 'groq'

export const client = createClient({
	projectId: '6puot771',
	dataset: 'production',
	apiVersion: '2024-02-26',
	useCdn: !dev,
	perspective: dev ? 'previewDrafts' : 'published',
})
