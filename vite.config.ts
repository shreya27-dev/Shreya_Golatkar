import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  server: {
    port: 5173,
    host: 'localhost'
  },

  preview: {
    port: 4173,
    host: 'localhost'
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});