import tailwindcssAnimate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(var(--bg))',
        surface: 'hsl(var(--surface))',
        'text-primary': 'hsl(var(--text))',
        muted: 'hsl(var(--muted))',
        stroke: 'hsl(var(--stroke))',
      },
      fontFamily: {
        body: ['var(--font-body)'],
        display: ['var(--font-display)'],
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

