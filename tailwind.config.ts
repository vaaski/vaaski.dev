import { defineConfig } from "vite-plugin-windicss"

const colors = {
  "clr-bg": "var(--clr-bg)",
  "clr-dark": "var(--clr-dark)",
  "clr-white": "var(--clr-white)",
  "clr-accent-pink": "var(--clr-accent-pink)",
  "clr-accent-blue": "var(--clr-accent-blue)",
}

export default defineConfig({
  darkMode: "class",
  theme: {
    extend: {
      colors,
      ringColor: colors,
      fontFamily: {
        DEFAULT: ["Manrope"],
      },
    },
  },
  plugins: [require("windicss/plugin/aspect-ratio")],
})
