/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  prefix: "",
  theme: {
    extend:{
      screens:{
        xs:"500px"
      },

    },
    fontFamily:{
      "iranyekan" : "iranyekan"
    },
    
  },
  plugins: [],
}