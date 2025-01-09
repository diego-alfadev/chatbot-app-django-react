/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'theme(colors.zinc.900)',
      },
      fontFamily: {
        sans: ['InterVaiable', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

