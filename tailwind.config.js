import plugin from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,svelte}'],
	theme: {
		extend: {
			colors: {
				accent: '#c0bafe',
				highlight: '#f1c455',
				canvas: '#020202',
				ink: '#aaa',
			},
			screens: {
				'<sm': { max: '639px' },
				'<md': { max: '767px' },
				'<lg': { max: '1023px' },
				'<xl': { max: '1279px' },
			}
		}
	},
	plugins: []
}
