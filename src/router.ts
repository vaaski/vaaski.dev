import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: require("./views/home.vue").default,
  },
  {
    path: "/minify",
    name: "minify",
    component: () =>
      // eslint-disable-next-line no-inline-comments
      import(
        /* webpackChunkName: "minify" */
        "./views/minify.vue"
      ),
  },
  {
    path: "/m",
    redirect: "/minify",
  },
  {
    path: "/countdown/:to?/:name?",
    alias: "/cd/:to?/:name?",
    name: "countdown",
    component: () =>
      // eslint-disable-next-line no-inline-comments
      import(
        /* webpackChunkName: "countdown" */
        "./views/countdown.vue"
      ),
  },
  {
    path: "*",
    redirect: "/",
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
