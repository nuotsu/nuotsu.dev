import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/app.html', './src/{lib,routes}/*.svelte'],
	theme: {
		extend: {
			colors: {
				white: '#fffbff',
				ink: {
					DEFAULT: '#636164',
					shadow: '#d5d2cc',
				},
			},
			fontFamily: {
				sans: ['Pokemon RS', 'sans-serif'],
			},
		},
	},
	plugins: [
		/** @type {import('tailwindcss').PluginAPI} */
		plugin(function ({ matchComponents, theme }) {
			matchComponents(
				{
					'font-shadow': ({ shadow }) => ({
						textShadow: `.15ch 0 ${shadow}, 0 .15ch ${shadow}, .15ch .15ch ${shadow}`,
					}),
				},
				{ values: theme('colors') },
			)
		}),
	],
}
