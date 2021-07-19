import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

import "./styles"
import "virtual:windi.css"
import "vite-plugin-svg-icons/register"

import * as Sentry from "@sentry/vue"
import { Integrations } from "@sentry/tracing"

const app = createApp(App)

Sentry.init({
  app,
  dsn: "https://c8e4a921785d44139ef8bd65db34e2a1@o105856.ingest.sentry.io/5555374",
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: [
        "localhost",
        "https://vaaski.dev",
        "https://vaaski.com",
        "https://vaa.ski",
      ],
    }),
  ],
  tracesSampleRate: 1.0,
  logErrors: true,
  trackComponents: true,
  hooks: ["activate", "create", "destroy", "mount", "update"],
})

app.use(router).mount("#app")

// import { registerSW } from "virtual:pwa-register"

// // TODO
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const updateSW = registerSW({
//   onNeedRefresh() {
//     console.log("onNeedRefresh")
//     // show a prompt to user
//   },
//   onOfflineReady() {
//     console.log("onOfflineReady")
//     // show a ready to work offline to user
//   },
// })

const unregisterSW = async () => {
  const registrations = await window.navigator.serviceWorker.getRegistrations()
  for (const registration of registrations) registration.unregister()
}

unregisterSW()
