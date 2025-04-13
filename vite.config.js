import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mui/material',
      'framer-motion',
      'react-icons',
      'ethers',
      'bip39',
      'bitcoinjs-lib'
    ]
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          crypto: ['ethers', 'bip39', 'bitcoinjs-lib'],
        }
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true
  }
});