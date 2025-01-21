/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'gris' : '#D9D9D9' ,
        'main' : "#F6F7FB",
        'secondary' : "#DD86FF",
        'primary' : '#03005B',
        'secondarytwo' : '#630289',
      },
      fontFamily : {
        'bricolage' : ["Bricolage Grotesque", 'serif'],
        'dm' : ["DM Sans", 'serif'],
        'Geist' : ["Geist", 'serif'],
      }
    },
  },
  plugins: [],
}