/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors:{
        pricolor:'blue',
        bg:'#fff',
        textcolor:'black'
        
            },

    },
    screens: {

        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
    },
    // spacing:{
    //   '1':'15px',
    //   '2':'50px',
    //   '3':'150px',
    // '4':'300px'
    
    // },
    boxShadow:{
      shodowone:"10px 10px 19px #1cle22,-10px 19px #262a2e"
    },
   
    
    
  },
  plugins: [
    require('daisyui'),
  ],
}

