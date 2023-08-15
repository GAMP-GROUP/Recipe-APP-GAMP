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
        'orange': '#7035F2',
        'apple': '#3603A6',
        'magenta': '#7035F2',
      },
      borderRadius: {
        'arch': '4555px'
      }
    },
  },
  plugins: [],
}
export default config
