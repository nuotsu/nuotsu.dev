/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,svelte}'],
	theme: {
		extend: {
			fontFamily: {
				sans: "'Maru Monica', sans-serif",
				cursive: "'Ounen-mouhitsu', cursive",
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
