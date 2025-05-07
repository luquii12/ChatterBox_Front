import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()
    ,tailwindcss()
  ],
  define: {
    global: {},
  },
  server: {
    https: {
      key: fs.readFileSync('localhost-key.pem'),
      cert: fs.readFileSync('localhost.pem'),
    },
    port: 5173,
    proxy: {
      '/ws': {
        target: 'https://localhost:8443/',
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
