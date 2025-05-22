import { dev } from '$app/environment'
import { injectAnalytics } from '@vercel/analytics/sveltekit'

injectAnalytics({ mode: dev ? 'development' : 'production' })

console.info(
	'%c web dev is my passion. 👨‍💻 ',
	`font: 2rem 'Comic Sans MS';
	background-image: linear-gradient(135deg, red, violet, blue, turquoise, green, yellow, orange, red);
	color: black;`,
)
