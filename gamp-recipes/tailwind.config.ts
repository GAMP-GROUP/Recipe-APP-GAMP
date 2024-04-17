import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		fontSize:{
			'heading1': ['3rem', {
				fontWeight: '900',
				lineHeight: '4.5rem'
			}],
			'heading2': ['2rem', {
				fontWeight: '700',
				lineHeight: '2.25rem'
			}],
			'heading3': ['1.5rem', {
				fontWeight: '700',
				lineHeight: '1.5rem'
			}],
			'strong': ['1rem', {
				fontWeight: '700'
			}],
			'base': ['1rem', {
				fontWeight: '400'
			}],
			'light': ['1rem', {
				fontWeight: '300'
			}],
		},
		extend: {
			colors: {
				'yellow': '#F2E635',
				'black': '#060606',
				'white': '#F0F1F2',
				'gray1': '#D1D5DB',
				'gray2': '#6B7280',
				'gray3': '#4B5563',
				'pasta': '#FBBF24',
				'pork': '#FB7185',
				'lamb': '#D4C2CB',
				'chicken': '#F1B56C',
				'vegetarian': '#4ADE80',
				'beef': '#F21D55',
				'dessert': '#F16CEC',
				'side': '#2ABFA4',
				'seafood': '#84D1FC',
				'miscellaneous': '#FF9F9F',
				'alcoholic': '#C084FC',
				'nonalcoholic': '#60A5FA',
				'optional': '#B641A3',
			},
			fontFamily: {
				'croissant': ['Croissant One', 'cursive'],
				'lato': ['Lato', 'sans-serif'],
				'argentum': ['Argentum-Sans-Bold',],
				'poppins': ['Poppins', 'sans-serif'],
			}
		},
	},
	plugins: [
		require('tailwind-scrollbar'),
	],
};
export default config;
