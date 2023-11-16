/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  darkMode: 'class',
  theme: {    
    fontFamily: {
      'title-sy': ["Satisfy", 'cursive'],
      'body-rb': ["Rubik", 'sans-serif'],
    },
    extend: {
      spacing: {},
      borderRadius: {},
      colors: {
        orange_primary: '#FD6543',
        orange_secondary: '#b32607',        
      },
      
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/typography'),
  ],
}

