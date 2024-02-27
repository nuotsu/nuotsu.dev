/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,svelte}'],
	theme: {
		extend: {
			colors: {
				accent: '#0f0',
				ink: '#e2e2e2',
			},
			fontFamily: {
				sans: ['Pokemon RS', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
