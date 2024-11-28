/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 2px 2px #0000000f, 0 1px 3px #0000001a;',
        '4xl': '0 0 8px 2px rgba(0,0,0,0.3)',
      }
    },
  },
  plugins: [],
}

