import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			width: {
				'big': '105px',
				'small': '75px',
			},
			colors: {
				'yellow': '#F2E635',
				'gold': '#F2BA52',
				'red': '#F21D55',
			},
			fontFamily: {
				'croissant': ['Croissant One', 'cursive'],
				'lato': ['Lato', 'sans-serif'],
				'argentum': ['Argentum-Sans-Bold',],
				'poppins': ['Poppins', 'sans-serif'],

			},




		},
	},
	plugins: [],
};
export default config;
