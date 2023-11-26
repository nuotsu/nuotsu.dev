/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,svelte}'],
	theme: {
		extend: {
			colors: {
				canvas: '#000',
				ink: '#fff',
			}
		}
	},
	plugins: []
}
