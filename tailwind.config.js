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
        brand: {
          dark: '#09090B',
          snow: '#FAFAFA',
          emerald: '#10B981',
          blue: '#2563EB',
          cyan: '#06B6D4'
        }
      }
    },
  },
  plugins: [],
}
