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
			},
			screens: {
				'xs': { min: '480px' },
				'<xs': { max: '479px' },
				'<sm': { max: '639px' },
				'<md': { max: '767px' },
				'<lg': { max: '1023px' },
				'<xl': { max: '1279px' },
				'<2xl': { max: '1535px' }
			}
		},
	},
	plugins: [],
}
