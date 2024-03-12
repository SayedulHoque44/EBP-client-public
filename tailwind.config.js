/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    
  ],
  theme: {
    extend: {
      colors: {
        'P-Black': '#121113',
        'P-gry': '#c3c4c8',
        // 'P-primary': '#fee100',
        'P-primary': '#8319f4',

      },
    },
  },
  plugins: [require("daisyui"),],
  daisyui: {
    themes: ["light",],
  },
}

