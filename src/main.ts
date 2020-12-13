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
