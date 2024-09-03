export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },

	modules: [
		"@nuxtjs/tailwindcss",
		"shadcn-nuxt",
		"@vueuse/nuxt",
		"@nuxt/eslint",
		"@nuxtjs/plausible",
	],

	plausible: {
		apiHost: "https://plausible.vaaski.dev",
		domain: "vaaski.dev",
	},

	router: {
		options: { scrollBehaviorType: "smooth" },
	},

	app: {
		pageTransition: { name: "page", mode: "out-in" },
		head: {
			htmlAttrs: { lang: "en" },
			link: [
				{
					rel: "apple-touch-icon",
					sizes: "180x180",
					href: "/apple-touch-icon.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "32x32",
					href: "/favicon-32x32.png",
				},
				{
					rel: "icon",
					type: "image/png",
					sizes: "16x16",
					href: "/favicon-16x16.png",
				},
				{ rel: "manifest", href: "/site.webmanifest" },
				{ rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#442051" },
			],
			meta: [
				{ name: "msapplication-TileColor", content: "#280d3f" },
				{ name: "theme-color", content: "#ffffff" },
			],
		},
	},

	features: {
		inlineStyles: false,
	},

	vue: {
		compilerOptions: {
			isCustomElement: (tag) => tag.includes("-"),
		},
	},
})
