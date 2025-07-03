import react from "@vitejs/plugin-react";
import { config } from "dotenv";
import path from "path";
import { defineConfig } from "vite";
import htmlPlugin from "vite-plugin-html-config";
import { VitePWA } from "vite-plugin-pwa";
import manifest from "./app/manifest.json";
import pjson from "./package.json";

config();

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      srcDir: "app",
      registerType: "autoUpdate",
      scope: "/FUNNIEST.games/",
      manifest: manifest,
      workbox: {
        globIgnores: [
          "**/IodineGBA/index.html",
          "**/node_modules/**/*"
        ]
      }
    }),
    htmlPlugin({
      metas: [
        {
          name: "description",
          content: manifest.description || ""
        },
        {
          name: "theme-color",
          content: manifest.theme_color || "#23263a"
        },
        {
          name: "og:image",
          content: "/FUNNIEST.games/banner.png"
        }
      ],
      links: [
        {
          rel: "apple-touch-icon",
          href: "/FUNNIEST.games/apple_touch_icon.png"
        }
      ]
    })
  ],
  base: "/FUNNIEST.games/", // CRITICAL for GitHub Pages!
  define: {
    "PRODUCTION": process.env.NODE_ENV?.toLowerCase() === "production",
    "APP_MANIFEST": {
      name: manifest.name,
      version: pjson.version,
      description: manifest.description,
      author: pjson.author
    }
  },
  root: "app",
  server: {
    port: 8080,
    hmr: {
      protocol: "ws",
      host: "localhost"
    }
  },
  build: {
    outDir: "../docs" // This will put your build output in /docs
  },
  resolve: {
    alias: {
      "styles": path.resolve(__dirname, "./app/styles"),
      "pages": path.resolve(__dirname, "./app/pages")
    }
  }
});