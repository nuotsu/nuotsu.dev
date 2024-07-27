/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,svelte}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Anton', 'sans-serif'],
			},
			colors: {
				canvas: '#000',
				ink: '#fff',
			},
			zIndex: {
				1: '1',
			},
		},
	},
	plugins: [],
}
