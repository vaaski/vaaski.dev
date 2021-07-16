<script setup lang="ts">
import type { RenderSettings } from "@/time"

import { ref, computed } from "vue"
import { useRoute } from "vue-router"

import TransitionText from "@/components/TransitionText.vue"
import { useTimestamp } from "@vueuse/core"
import { renderTime, useBackgroundTitle } from "@/time"

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

const time = useTimestamp()
const endTimestamp = parseInt(query.t, 36) * 1e3
const end = new Date(endTimestamp).getTime()
const display = computed(() => renderTime(end - time.value, renderSettings))

const titleTime = useTimestamp({ interval: 100 })
const titleDisplay = computed(() => renderTime(end - titleTime.value, renderSettings))
useBackgroundTitle(titleDisplay)
</script>

<template>
  <main class="flex h-full w-full full justify-center items-center">
    <TransitionText :text="display" style="font-size: 9vw" :duration="250" />
  </main>
</template>
