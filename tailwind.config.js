/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'nyt-black': '#000000',
        'nyt-gray': {
          100: '#F7F7F7',
          200: '#EBEBEB',
          300: '#E2E2E2',
          400: '#CCCCCC',
          500: '#999999',
          600: '#666666',
          700: '#444444',
        },
      },
      fontFamily: {
        'nyt-serif': ['NYT-Serif', 'Georgia', 'serif'],
        'nyt-sans': ['NYT-Sans', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'nyt': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '1': '1px',
        '2': '2px',
      },
      gridTemplateColumns: {
        'nyt-main': '2fr 1fr',
        'nyt-layout': 'repeat(12, minmax(0, 1fr))',
      },
      transitionDuration: {
        '2000': '2000ms',
      }
    },
  },
  plugins: [],
};