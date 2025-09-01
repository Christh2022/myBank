import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '') // Réécrit l'URL pour correspondre à l'API backend
      },
    },
    host: true,             // Permet les connexions extérieures
    port: 3000,             // Port à exposer
    strictPort: true,
    watch: {
      usePolling: true      // Nécessaire pour Docker
    }
  }
})
