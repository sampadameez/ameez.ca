/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050714',
        surface: '#0F172A',
        primary: '#3B82F6',
        secondary: '#14B8A6',
        muted: '#94A3B8',
      },
    },
  },
  plugins: [],
}