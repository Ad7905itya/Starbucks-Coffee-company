import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: false, // Prevent Vite from automatically opening the browser
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',  // backend port 4000 hai
        changeOrigin: true,
      }
    }
  },
})
