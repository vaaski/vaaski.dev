<script setup lang="ts">
import { ref } from "@vue/reactivity"
import { useRoute } from "vue-router"

import TransitionText from "@/components/TransitionText.vue"

const route = useRoute()
const query = {
  t: new Date(Date.now() + 60e3).getTime().toString(36),
  ...route.query,
}
const text = ref("test")
// @ts-ignore
window.text = text
</script>

<template>
  <main class="flex h-full w-full full justify-center items-center">
    <TransitionText :text="text" style="font-size: 15vw" :duration="5000" />
  </main>
</template>
