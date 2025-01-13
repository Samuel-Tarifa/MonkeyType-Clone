/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      background:'#323437',
      primary:'#646669',
      secondary:'#2c2e31',
      yellow:'#e2b714',
      white:'#d1d0c5',
      red:'#ca4754'
    },
    extend: {},
  },
  plugins: [],
}