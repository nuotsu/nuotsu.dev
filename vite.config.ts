import adapter from '@sveltejs/adapter-vercel'
import { enhancedImages } from '@sveltejs/enhanced-img'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'node:child_process'
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

// ISO date of the latest commit, read at build time (falls back to the build time if git is unavailable)
function lastCommitDate() {
	try {
		return execSync('git log -1 --format=%cI', { encoding: 'utf8' }).trim()
	} catch {
		return new Date().toISOString()
	}
}

export default defineConfig({
	define: {
		__LAST_COMMIT_DATE__: JSON.stringify(lastCommitDate())
	},
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
