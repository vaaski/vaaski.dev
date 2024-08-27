import unicorn from "eslint-plugin-unicorn"
import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt().prepend([unicorn.configs["flat/recommended"]])
