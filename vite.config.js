import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import thirdPartyNotices from "./scripts/vite-plugin-third-party-notices.js";

// https://vite.dev/config/
export default defineConfig({
  // Served from the domain root by default; the GitHub Pages workflow sets
  // BASE_PATH because a project page lives under /<repo>/.
  base: process.env.BASE_PATH ?? "/",
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    thirdPartyNotices(),
  ],
});
