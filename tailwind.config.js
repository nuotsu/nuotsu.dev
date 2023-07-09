/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,svelte}'],
	theme: {
		extend: {
			fontFamily: {
				mets: `'Hessian', serif`,
				boston: `'MLB Tusca', serif`,
			},
			colors: {
				accent: '#fb923c',
				gold: '#b89f5e',
			},
			screens: {
				'<sm': { max: '640px' },
				'<md': { max: '768px' },
				'<lg': { max: '1024px' },
				'<xl': { max: '1280px' },
				'<2xl': { max: '1536px' },
			}
		},
	},
	plugins: [],
}
