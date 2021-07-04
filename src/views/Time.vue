<script lang="ts" setup>
import { computed, ref, watch } from "vue"
import TransitionText from "@/components/TransitionText.vue"
import { useNow } from "@vueuse/core"

const time = useNow()
let display = computed(() => time.value.toLocaleTimeString())
</script>

<template>
  <main class="flex h-full w-full items-center justify-center">
    <TransitionText :text="display" style="font-size: 10vw;" />
  </main>
</template>