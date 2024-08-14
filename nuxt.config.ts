// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  router: {
    options: { scrollBehaviorType: "smooth" },
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  features: {
    inlineStyles: false,
  },

  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@vueuse/nuxt"],
})
