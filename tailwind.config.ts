import { defineConfig } from "vite-plugin-windicss"
import defaultTheme from "windicss/defaultTheme"

// todo: get rid of tailwind
const colors = {
  "clr-bg": "var(--clr-bg)",
  "clr-bg-trans": "var(--clr-bg-trans)",
  "clr-dark": "var(--clr-dark)",
  "clr-white": "var(--clr-white)",
  "clr-navbar": "var(--clr-navbar)",
  "clr-accent-pink": "var(--clr-accent-pink)",
  "clr-accent-blue": "var(--clr-accent-blue)",
}

const sizes = {
  nav: "var(--nav-height)",
}

const { sans, mono } = defaultTheme.fontFamily

export default defineConfig({
  darkMode: "class",
  theme: {
    extend: {
      colors,
      ringColor: colors,
      height: sizes,
      padding: sizes,
    },
    fontFamily: {
      ...defaultTheme.fontFamily,
      sans: ["Manrope", ...sans],
      mono: ['"Roboto Mono"', ...mono],
    },
  },
  plugins: [require("windicss/plugin/aspect-ratio")],
})
