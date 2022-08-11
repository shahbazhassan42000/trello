/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-shadow': 'rgba(0, 0, 0, 0.10)',
      },
    },
  },
  plugins: [],
}
