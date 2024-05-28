import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'


export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './index.html'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
} satisfies Config

