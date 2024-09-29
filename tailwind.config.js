/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    fontFamily: {
      'display': ['Gilroy'],
      'body': ['Gilroy'],
      'gilroy': ["Gilroy", "sans-serif"],
    },
    extend: {
      colors: {
        black: '#050505',
        'slate': {
          100: '#F5F7FA',
          200: '#E4EAF0',
        },
        'gray': {
          200: '#E3E7F0',
          300: '#C4C8CC',
          500: '#707680',
          600: '#656A73',
        },
        'zinc': {
          200: '#EBECF0',
          400: '#9B9DA0',
        },
        'natural': {
          400: '#B0B0B0',
        },
        'amber': {
          400: '#FFBA14',
          500: '#FFC220',
          600: '#F9A702',
        },
        'blue': {
          50: '#E1E8F5',
          200: '#8BC9FF',
          300: '#78B7EF',
          400: '#3483C8',
          500: '#0071DC',
          600: '#005EB8',
          700: '#0057C2',
        },
        'green': {
          500: '#27AE60',
          600: '#269957',
        }
      }
    },
  },
  plugins: [],
}