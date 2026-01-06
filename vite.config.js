import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // Set base to repository name for GitHub Pages
  // Change 'panix-incremental' to your actual repository name if different
  base: process.env.NODE_ENV === 'production' ? '/panix-incremental/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
  },
  server: {
    port: 3000,
    open: true,
  },
})
