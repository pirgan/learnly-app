/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0d1117',
        elevated: '#161b22',
        card: '#1c2333',
        border: '#30363d',
      },
    },
  },
  plugins: [],
}
