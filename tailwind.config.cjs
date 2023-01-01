/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{svelte,html}'],
	theme: {
		extend: {
			fontFamily: {
				'california': ['Rage Italic', 'cursive'],
				'dealerplate': ['Dealerplate', 'monospace'],
				'trm': ['TRM', 'monospace'],
				'mplus': "'M PLUS Rounded 1c', sans-serif",
				'shippori': "'Shippori Antique B1', sans-serif",
			}
		},
	},
	plugins: [],
}
