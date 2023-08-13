import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        'big': '125px',
        'small': '75px',
      },
      colors: {
        'yellow': '#F2E635',
        'brown': '#F2BA52',
        'orange': '#D94B18',
        'red': '#F23545',
        'wine': '#A62E38',
      }
    },
  },
  plugins: [],
}
export default config
