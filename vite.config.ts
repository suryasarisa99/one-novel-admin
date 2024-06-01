import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {},
  plugins: [
    react(),
    VitePWA({
      includeAssets: ["favicon.ico"],
      registerType: "autoUpdate",

      devOptions: {
        enabled: true,
      },
      // manifest: false,
      manifest: {
        name: "books-admin",
        short_name: "books-admin",
        description: "My Awesome App description",
        start_url: "/",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#000000",
        icons: [
          {
            src: "/vite.svg",
            sizes: "512x512",
            // type: "image/png",
            type: "image/svg+xml",
          },
          {
            src: "/vite.svg",
            sizes: "144x144",
            type: "image/svg+xml",
          },
        ],
      },
    }),
  ],
  server: {
    host: "192.168.0.169",
    port: 4444,
  },
});
