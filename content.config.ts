import { defineContentConfig, defineCollection } from "@nuxt/content"

export default defineContentConfig({
	collections: {
		blog: defineCollection({
			type: "page",
			source: "**/*.md",
		}),
	},
})
