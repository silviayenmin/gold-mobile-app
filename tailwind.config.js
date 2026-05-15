/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D4AF37',
          dark: '#B8860B',
        },
        dark: {
          DEFAULT: '#0F172A',
          card: '#1E293B',
          accent: '#1e293b',
        },
        gold: {
          50: '#fffcf2',
          100: '#fff9e6',
          200: '#ffefbf',
          300: '#ffe18f',
          400: '#ffd05c',
          500: '#ffb924',
          600: '#e69810',
          700: '#bf740a',
          800: '#995a0a',
          900: '#7d4a0b',
          1000: '#D4AF37',
        },
      },
      fontFamily: {
        inter: ["Inter"],
      },
    },
  },
  plugins: [],
}
