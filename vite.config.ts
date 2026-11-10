import adapter from '@sveltejs/adapter-vercel'
import { enhancedImages } from '@sveltejs/enhanced-img'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { statSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'

// `import bytes from './file.png?size'` → the file's size in bytes, read at build time
function fileSize(): Plugin {
	return {
		name: 'file-size',
		enforce: 'pre',
		load(id) {
			if (!id.endsWith('?size')) return
			const file = id.slice(0, -'?size'.length)
			this.addWatchFile(file)
			return `export default ${statSync(file).size}`
		}
	}
}

export default defineConfig({
	plugins: [
		fileSize(),
		enhancedImages(),
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter()
		})
	]
})
