/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        goa: {
          green: '#036735',   // Official Deep Emerald Palm Green
          cream: '#FFFBE8',   // Official Warm Sand Cream
          pink: '#FF0080',    // Official Hot Magenta Pink
          yellow: '#FEE101',  // Official Electric Sun Yellow
          dark: '#03140C',    // Midnight Dark Green
          darker: '#020C07',  // Deepest Dark
        }
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        yatra: ['"Yatra One"', 'cursive'],
      },
      boxShadow: {
        'goa-glow': '0 0 25px rgba(255, 0, 128, 0.4)',
        'card-solid': '6px 6px 0px #000000',
        'card-solid-pink': '6px 6px 0px #FF0080',
        'card-solid-yellow': '6px 6px 0px #FEE101',
      }
    },
  },
  plugins: [],
}
