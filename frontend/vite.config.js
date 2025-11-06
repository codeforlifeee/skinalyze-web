import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
    open: true, // Auto-open browser
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  // Fallback for SPA routing
  preview: {
    port: 4173,
  }
})
