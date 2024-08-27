import unicorn from "eslint-plugin-unicorn"
import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt([
	{
		files: ["**/*.html", "**/*.vue"],
		rules: {
			// this is stupid.
			// https://github.com/prettier/prettier/issues/15336
			"vue/html-self-closing": "off",
		},
	},
]).prepend([
	unicorn.configs["flat/recommended"],
	{
		files: ["utils/*.ts", "functions/*.mts"],
		rules: {
			"unicorn/no-anonymous-default-export": "off",
		},
	},
	{
		files: ["**/*.vue"],
		rules: {
			"unicorn/prevent-abbreviations": [
				"error",
				{
					allowList: {
						props: true,
					},
				},
			],
		},
	},
])
