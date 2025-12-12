import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Changed from './' to '/' for correct client-side routing on Cloudflare
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  }
});