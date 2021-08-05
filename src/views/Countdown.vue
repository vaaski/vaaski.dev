<script setup lang="ts">
import type { RenderSettings } from "@/time"

import { ref, computed } from "vue"
import { useRoute, useRouter } from "vue-router"

import TransitionText from "@/components/TransitionText.vue"
import { useTimestamp } from "@vueuse/core"
import { parseTime, renderTime, decodeStamp } from "@/time"
import { useBackgroundTitle } from "@/util"

const route = useRoute()
const router = useRouter()
const query: Record<string, string> = {
  s: "mhdMy",
  ...route.query,
}

let endDate: Date

if (!query.t) {
  if (query.T) {
    endDate = parseTime(query.T)
  } else throw Error("missing time parameter")
  // todo catch and redirect to setup page
} else endDate = decodeStamp(query.t)

const renderSettings: RenderSettings = {
  y: query.s.includes("y") ?? true,
  M: query.s.includes("M") ?? true,
  w: query.s.includes("w") ?? true,
  d: query.s.includes("d") ?? true,
  h: query.s.includes("h") ?? true,
  m: query.s.includes("m") ?? true,
}

const time = useTimestamp()
const end = endDate.getTime()
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
