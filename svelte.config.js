import adapter from '@sveltejs/adapter-netlify'
import preprocess from 'svelte-preprocess'

const packages = [
	'snippets/marquee/Marquee.svelte',
	'snippets/pipewriter/Pipewriter.svelte',
]

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		outDir: 'build',
		package: {
			files: filepath => packages.includes(filepath)
		}
	},
	preprocess: [
		preprocess({
			postcss: true,
		})
	],
}

export default config
