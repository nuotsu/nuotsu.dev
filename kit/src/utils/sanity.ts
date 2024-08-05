import { createClient } from '@sanity/client'
import { dev } from '$app/environment'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export { default as groq } from 'groq'

export const client = createClient({
	projectId: '6puot771',
	dataset: 'production',
	apiVersion: '2024-07-25',
	useCdn: !dev,
	perspective: dev ? 'previewDrafts' : 'published',
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: SanityImageSource) => builder.image(source)
