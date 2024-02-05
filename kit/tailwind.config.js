import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/app.html', './src/{lib,routes}/*.svelte'],
	theme: {
		extend: {
			colors: {
				white: {
					DEFAULT: '#fffbff',
					shadow: '#695973',
				},
				black: {
					DEFAULT: '#010101',
					shadow: '#d5d2cc',
				},
				ink: {
					DEFAULT: '#636164',
					shadow: '#d5d2cc',
				},
				red: {
					DEFAULT: '#fe8983',
					shadow: '#fa3218',
				},
				green: {
					DEFAULT: '#1f9b08',
					shadow: '#92f193',
				},
				blue: {
					DEFAULT: '#3250cd',
					shadow: '#a3c1fa',
				},
				yellow: {
					DEFAULT: '#fdb052',
					shadow: '#c57903',
				},
			},
			fontFamily: {
				sans: ['Pokemon RS', 'sans-serif'],
			},
		},
	},
	plugins: [
		/** @type {import('tailwindcss').PluginAPI} */
		plugin(function ({ matchComponents, matchUtilities, theme }) {
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
