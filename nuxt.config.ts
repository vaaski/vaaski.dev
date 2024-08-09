// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  router: {
    options: { scrollBehaviorType: "smooth" },
  },

  experimental: {
    viewTransition: true,
  },

  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@vueuse/nuxt"],
})
