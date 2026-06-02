import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    viteTsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      // Сборка под обычный Node.js сервер (для self-hosting на VPS)
      target: "node-server",
    }),
    react(),
  ],
});
