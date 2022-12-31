import sanityClient from '@sanity/client'
import { dev } from '$app/environment'
// import { PUBLIC_SANITY_TOKEN } from '$env/static/public'

const client = sanityClient({
	projectId: 'bydcdjmg',
	dataset: 'production',
	apiVersion: '2022-12-31',
	useCdn: !dev,
	// token: PUBLIC_SANITY_TOKEN,
})

export default client
