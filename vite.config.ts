import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://two048-backend-1ofh.onrender.com'  // dev proxy to backend
    }
  }
});
