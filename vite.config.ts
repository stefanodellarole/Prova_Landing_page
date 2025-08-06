import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@/components": path.resolve(__dirname, "./components"),
      "@/contexts": path.resolve(__dirname, "./contexts"),
      "@/styles": path.resolve(__dirname, "./styles"),
      "@/utils": path.resolve(__dirname, "./utils")
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  server: {
    port: 8080,  // Change from 3000 to 8080
    host: true,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  }
})