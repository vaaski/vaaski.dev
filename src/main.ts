import { createApp } from "vue"
import app from "./App.vue"
import router from "./router"

import "./styles"
import "virtual:windi.css"
import "vite-plugin-svg-icons/register"

import { registerSW } from "virtual:pwa-register"

// TODO
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateSW = registerSW({
  onNeedRefresh() {
    console.log("onNeedRefresh")
    // show a prompt to user
  },
  onOfflineReady() {
    console.log("onOfflineReady")
    // show a ready to work offline to user
  },
})

createApp(app).use(router).mount("#app")
