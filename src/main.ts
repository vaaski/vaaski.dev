import Vue from "vue"

import * as Sentry from "@sentry/browser"
import { Integrations } from "@sentry/tracing"

Sentry.init({
  Vue,
  dsn: "https://c8e4a921785d44139ef8bd65db34e2a1@o105856.ingest.sentry.io/5555374",
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  logErrors: true,
  release: `vaaski.dev@${process.env.VERSION}`,
} as any)

import app from "./app.vue"
import "./registerServiceWorker"
import router from "./router"
// import store from "./store"

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    log(...text) {
      if (process.env.NODE_ENV !== "development") return
      const date = new Date().toLocaleTimeString("de")

      console.log(`(${date})[${this.$options.name}]`, ...text)
    },
  },
})

new Vue({
  router,
  // store,
  render: h => h(app),
}).$mount("#app")
