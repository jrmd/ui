import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
export default defineConfig({
  publicDir: "../../apps/catalogue/public",
  plugins: [react(), tailwind()],
  server: { host: "127.0.0.1", port: 4175, strictPort: true },
  build: { outDir: "dist" },
});
