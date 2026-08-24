/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        pine: {
          DEFAULT: '#004741',
          hover: '#005C55',
          dark: '#003833',
          light: '#0D6A62',
        },
        cream: {
          DEFAULT: '#F0EDE4',
          surface: '#FAF8F5',
          muted: '#E5E0D4',
          border: '#DDD7C8',
        },
        brand: {
          dark: '#004741',
          snow: '#F0EDE4',
          emerald: '#10B981',
          blue: '#004741',
          cyan: '#0D9488'
        }
      }
    },
  },
  plugins: [],
}
