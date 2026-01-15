/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tt-black': '#0C0D07',
        'tt-dark': '#314021',
        'tt-olive': '#617246',
        'tt-pink': '#C09BAC',
        'tt-beige': '#D8C6BA',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}