<script lang="ts" setup>
import type { Ref } from "vue"

import { computed } from "vue"
import { useRoute } from "vue-router"
import { useNow } from "@vueuse/core"

import TransitionText from "@/components/TransitionText.vue"
import { useBackgroundTitle, fullscreen } from "@/util"

const route = useRoute()
let locale = ""
if (typeof route.query.cc === "string") locale = route.query.cc

const getTime = (r: Ref<Date>) => () => r.value.toLocaleTimeString(locale || "de")

const time = useNow({ controls: true })
const display = computed(getTime(time.now))

const titleTime = useNow({ interval: 100 })
const titleDisplay = computed(getTime(titleTime))

useBackgroundTitle(titleDisplay, time)
</script>

<template>
  <main class="flex w-full items-center justify-center full">
    <TransitionText
      :text="display"
      @click="fullscreen.toggle()"
      style="font-size: 15vw"
    ></TransitionText>
  </main>
</template>