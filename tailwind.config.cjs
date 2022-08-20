/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.svelte'],
	theme: {
		extend: {
			colors: {
				ink: '#000',
				cream: '#faf6ea',
			},
			fontFamily: {
				serif: `'Abel', sans-serif`,
			}
		},
	},
	plugins: [],
}
