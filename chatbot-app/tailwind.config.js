/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'theme(colors.neutral.800)',
      },
      fontFamily: {
        sans: ['InterVaiable', 'sans-serif'],
      },

    },
          // Custom animations
      // Defined keyframes
      keyframes: {
        "fade-in": {
          '0%': { transform: 'translateY(15pt)', opacity: 0 },
          '100%': { transform: 'translateY(0pt)', opacity: 1 },
        },
        "fade-out": {
          '0%': { transform: 'translateY(0pt)', opacity: 1 },
          '100%': { transform: 'translateY(15pt)', opacity: 0 },
        },
        "dissappear": {
          '0%': { opacity: 1, visibility: 'visible' },
          '100%': { visibility: 'hidden', opacity: 0 },
        }
      },
      // Defined animations
      animation: {
        "fade-in": 'fade-in 1s ease-in-out',
        "fade-out": 'fade-out 1s ease-in-out',
        "dissappear": 'dissappear 1.5s ease-in-out forwards'
      }
  },
  plugins: [],
}

