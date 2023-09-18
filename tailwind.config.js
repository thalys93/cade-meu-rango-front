/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  darkMode: 'class',
  theme: {    
    colors: {
      'orange_primary': '#FD6543',
      'orange_secondary': '#b32607',
      'dark_primary': '3242526',
      'light_primary': '#F9F9F9'
      },
    fontFamily: {
      'title-sy': ["Satisfy", 'cursive'],
      'body-rb': ["Rubik", 'sans-serif'],
    },
    extend: {
      spacing: {

      },
      borderRadius: {

      }
    },
  },
  plugins: [],
}

