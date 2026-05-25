import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
//
// The "proxy" rule makes /api/* requests from the React dev server (port 5173)
// transparently forwarded to the Spring Boot backend (port 8080).
// This avoids CORS issues in dev AND lets us use relative URLs in the frontend
// code, which is exactly what we want in production too.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
