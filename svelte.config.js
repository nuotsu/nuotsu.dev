import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'

const packages = [
	'index.js',
	'snippets/marquee/Marquee.svelte',
	'snippets/pipewriter/Pipewriter.svelte',
]

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		outDir: 'build',
	},
	preprocess: [
		preprocess({
			postcss: true,
		})
	],
	package: {
		files: filepath => packages.includes(filepath),
	},
}

export default config
