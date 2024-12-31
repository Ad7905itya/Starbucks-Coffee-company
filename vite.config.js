import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: false, // Prevent Vite from automatically opening the browser
  },
  plugins: [react()],
})
