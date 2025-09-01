/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // important avec Vite !
    ],
    theme: {
      extend: {
        screens: {
            'xs': '480px',     // Nouveau breakpoint XS
            'sm': '640px',
            'md': '760px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
            '3xl': '1800px',   // Breakpoint encore plus large si besoin
        },
        spacing: {
          '13': '3.25rem',  // Gap personnalisé
          '15': '3.75rem',
          '18': '4.5rem',
        },
        dropShadow: {
          'orange': '0 0 4px 1px #FCA311',
        },
        colors: {
          'brand-orange': '#FCA311',
        },
      },
    },
    plugins: [],
  }
  