import LogRocket from "logrocket"
// cspell: disable-next-line
LogRocket.init("4sngkz/vaaskidev")

const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  )

let uuid = localStorage.getItem("vaaski.dev-uuid")

if (!uuid) {
  uuid = UUIDGeneratorBrowser()
  localStorage.setItem("vaaski.dev-uuid", uuid)
}

LogRocket.identify(uuid)

import Vue from "vue"
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
