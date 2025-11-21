/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'sup-blue': '#0A1F44',
        'sup-red': '#E30613',
        'dominant-white': '#FFFFFF',
        'sup-light-blue': '#E9EEF7',
        'sup-gray': '#666666'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      },
      boxShadow: {
        'card': '0 6px 20px rgba(10,31,68,0.08)'
      }
    },
  },
  plugins: [],
}

