<script lang="ts" setup>
import type { Ref } from "vue"

import { computed, watchEffect } from "vue"
import { useDocumentVisibility, useNow, useTitle } from "@vueuse/core"
import { useRoute } from "vue-router"

import TransitionText from "@/components/TransitionText.vue"

const route = useRoute()
let locale = ""
if (typeof route.query.cc === "string") locale = route.query.cc

const getTime = (r: Ref<Date>) => () => r.value.toLocaleTimeString(locale || "de")

const time = useNow({ controls: true })
const display = computed(getTime(time.now))

const titleTime = useNow({ interval: 100 })
const titleDisplay = computed(getTime(titleTime))

const visible = computed(() => useDocumentVisibility().value === "visible")

const initialTitle = document.title
const title = computed(() => {
  if (visible.value) return initialTitle
  else return `${titleDisplay.value} - ${initialTitle}`
})

watchEffect(() => (visible.value ? time.resume() : time.pause()))
useTitle(title)
</script>

<template>
  <main class="flex h-full w-full items-center justify-center full">
    <TransitionText :text="display" style="font-size: 15vw"></TransitionText>
  </main>
</template>
