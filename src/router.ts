import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("./views/HomeView.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("./views/ContactView.vue"),
  },
  {
    path: "/time",
    name: "time",
    component: () => import("./views/Time.vue"),
  },
  {
    path: "/cd",
    alias: "/countdown",
    name: "countdown",
    component: () => import("./views/Countdown.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
