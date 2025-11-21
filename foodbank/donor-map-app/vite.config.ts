import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: false, // Will try other ports if 3000 is busy
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7071',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
