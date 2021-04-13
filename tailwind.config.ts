import { defineConfig } from "vite-plugin-windicss"

export default defineConfig({
  darkMode: "class",
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        DEFAULT: ["Manrope"],
      },
    },
  },
  plugins: [require("windicss/plugin/aspect-ratio")],
})
