/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,svelte}'],
	theme: {
		extend: {
			colors: {
				accent: 'lch(32.79% 130 300)',
				highlight: '#f1c455',
				ink: '#c0bafe',
			},
		},
	},
	plugins: [],
}
