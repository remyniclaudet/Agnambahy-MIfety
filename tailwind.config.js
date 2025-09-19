/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2986cc',   // Bleu
        secondary: '#cc4042', // Rouge
      },
      fontFamily: {
        'brans': ['Brans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}