import { resolve } from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import WindiCSS from "vite-plugin-windicss"
import viteSvgIcons from "vite-plugin-svg-icons"
import { VitePWA } from "vite-plugin-pwa"

const color = "#162837"

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        theme_color: color,
        background_color: color,
        name: "vaaski.dev",
        short_name: "vaaski.dev",
        start_url: "./index.html",
        display: "standalone",
        icons: [
          {
            src: "icons/pwa-192x192.png",
            sizes: "192x192",
          },
          {
            src: "icons/pwa-256x256.png",
            sizes: "256x256",
          },
          {
            src: "icons/pwa-512x512.png",
            sizes: "512x512",
          },
        ],
      },
    }),
    WindiCSS({
      scan: {
        fileExtensions: ["vue", "html", "ts"],
      },
    }),
    viteSvgIcons({
      iconDirs: [resolve(process.cwd(), "src/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      $: resolve(__dirname, "./types"),
    },
  },
})
