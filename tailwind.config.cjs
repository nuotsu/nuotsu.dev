/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{svelte,html}'],
	theme: {
		extend: {
			fontFamily: {
				'dealerplate': ['Dealerplate', 'monospace'],
				'california': ['Rage Italic', 'cursive'],
				'platnomor': ['Plat Nomor', 'cursive'],
				'trm': ['TRM', 'monospace'],
				'mplus': "'M PLUS Rounded 1c', sans-serif",
				'shippori': "'Shippori Antique B1', sans-serif",
			},
			colors: {
				paper: '#f7f7f7',
			},
			screens: {
				'<sm': { max: '639px' },
				'<md': { max: '767px' },
				'<lg': { max: '1023px' },
				'<xl': { max: '1279px' },
				'<2xl': { max: '1535px' }
			},
		},
	},
	plugins: [],
}
