import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'

export default defineConfig({
	plugins: [sveltekit()],

	server: {
		fs: {
			allow: ['sanity.cli.ts', 'sanity.config.ts'],
		},
	},
})
