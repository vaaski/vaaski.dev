<script lang="ts" setup>
import { computed } from "vue"
import { useNow } from "@vueuse/core"
import { useRoute } from "vue-router"

import TransitionText from "@/components/TransitionText.vue"

const route = useRoute()
let locale = ""
if (typeof route.query.cc === "string") locale = route.query.cc || ""

const time = useNow()
const display = computed(() => time.value.toLocaleTimeString(locale || "de"))
</script>

<template>
  <main class="flex h-full w-full items-center justify-center full">
    <TransitionText :text="display" style="font-size: 10vw"></TransitionText>
  </main>
</template>
