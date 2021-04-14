import { createApp } from "vue"
import app from "./app.vue"
import router from "./router"

import "./styles"
import "virtual:windi.css"
import "vite-plugin-svg-icons/register"

createApp(app).use(router).mount("#app")
