/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,svelte}'],
	theme: {
		extend: {
			colors: {
				accent: 'turquoise',
			},
			fontFamily: {
				sans: `"Space Grotesk", sans-serif`,
			}
		},
	},
	plugins: [],
}
