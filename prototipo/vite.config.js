import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  server: {
    https: {
      key: fs.readFileSync("certificates/localhost.key"),
      cert: fs.readFileSync("certificates/localhost.crt"),
    },
    port: 5173,
    // proxy: {
    //   "/ws": {
    //     target: "https://localhost:8443",
    //     changeOrigin: true,
    //     ws: true,
    //     secure: false, // Si usas HTTPS y no quieres verificar el certificado (útil para desarrollo)
    //   },
    // },
  },
});
