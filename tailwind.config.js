/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    // customized breakpoints //
    screens: {
     'mobile': '450px',
       
     'tablet': '760px',

     'laptop': '1090px',

     'desktop': '1280px',
   },
   extend: {
    backgroundImage: {
      'greek': "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
      'new':"url('../assets/new.svg)",
    }
  },
  }, 
  plugins: [
    require('tailwind-scrollbar'),
  ],
}