<script setup lang="ts">
import type { RenderSettings } from "@/time"

import { computed } from "vue"
import { useRoute } from "vue-router"

import TransitionText from "@/components/TransitionText.vue"
import { useTimestamp } from "@vueuse/core"
import { parseTime, renderTime, decodeStamp } from "@/time"
import { useBackgroundTitle, fullscreen } from "@/util"

const route = useRoute()
// const router = useRouter()

interface ExpectedQuery {
  /** render settings */
  s?: string
  /** timestamp in shortened string format */
  t?: string
  /** timestamp for Date.parse */
  T?: string
  /** name of the countdown */
  n?: string
}
const query: ExpectedQuery = {
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
  y: query.s?.includes("y") ?? true,
  M: query.s?.includes("M") ?? true,
  w: query.s?.includes("w") ?? true,
  d: query.s?.includes("d") ?? true,
  h: query.s?.includes("h") ?? true,
  m: query.s?.includes("m") ?? true,
  s: query.s?.includes("s") ?? true,
}

const time = useTimestamp()
const end = endDate.getTime()
const display = computed(() => renderTime(end - time.value, renderSettings))

const titleTime = useTimestamp({ interval: 100 })
const titleDisplay = computed(() => renderTime(end - titleTime.value, renderSettings))
useBackgroundTitle(titleDisplay)
</script>

<template>
  <main class="flex flex-col h-full w-full full justify-center items-center">
    <h1 v-if="query.n" class="opacity-50 text-3xl">{{ query.n }}</h1>
    <TransitionText
      :text="display"
      @click="fullscreen.toggle()"
      style="font-size: 9vw"
      :duration="250"
    />
  </main>
</template>

<style scoped lang="scss">
h1 {
  max-width: 90vw;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
