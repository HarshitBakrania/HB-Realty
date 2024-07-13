/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "background-color" : "#0F0F10",
        "secondary-color": "#18181B",
        "navbar-color": "#E6E6E6"
      }
    },
  },
  plugins: [],
}

