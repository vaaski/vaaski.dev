<script setup lang="ts">
import type { RenderSettings } from "@/time"

import { ref } from "@vue/reactivity"
import { useRoute } from "vue-router"

import TransitionText from "@/components/TransitionText.vue"
import { useTimestamp } from "@vueuse/core"
import { computed } from "@vue/runtime-core"
import { renderTime } from "@/time"

const route = useRoute()
const query: Record<string, string> = {
  s: "mhdMy",
  ...route.query,
}

if (!query.t) {
  // todo redirect to setup page
  throw Error("missing time parameter")
}

const renderSettings: RenderSettings = {
  y: query.s.includes("y") ?? true,
  M: query.s.includes("M") ?? true,
  w: query.s.includes("w") ?? true,
  d: query.s.includes("d") ?? true,
  h: query.s.includes("h") ?? true,
  m: query.s.includes("m") ?? true,
}

const now = useTimestamp()
const endTimestamp = parseInt(query.t, 36) * 1e3
const end = new Date(endTimestamp).getTime()
const text = computed(() => renderTime(end - now.value, renderSettings))
</script>

<template>
  <main class="flex h-full w-full full justify-center items-center">
    <TransitionText :text="text" style="font-size: 9vw" :duration="250" />
  </main>
</template>
