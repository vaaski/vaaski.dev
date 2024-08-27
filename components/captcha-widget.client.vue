<script setup lang="ts">
import "altcha"

const altchaWidget = ref<HTMLElement>()
const props = defineProps({
  payload: {
    type: String,
    required: false,
  },
})
const emit = defineEmits<(e: "update:payload", value: string) => void>()
const internalValue = ref(props.payload)

watch(internalValue, (v) => {
  emit("update:payload", v || "")
})

const onStateChange = (ev: CustomEvent | Event) => {
  if ("detail" in ev) {
    const { payload, state } = ev.detail
    if (state === "verified" && payload) {
      internalValue.value = payload
    } else {
      internalValue.value = ""
    }
  }
}

onMounted(async () => {
  await nextTick()

  if (!altchaWidget.value) throw new Error("altcha widget not found")
  altchaWidget.value.addEventListener("statechange", onStateChange)
})

onUnmounted(async () => {
  await nextTick()

  altchaWidget.value?.removeEventListener("statechange", onStateChange)
})
</script>

<template>
  <altcha-widget
    ref="altchaWidget"
    debug
    hidefooter
    challengeurl="/.netlify/functions/generate-challenge"
  />
</template>

<style lang="scss">
:root {
  --altcha-max-width: 100%;
  --altcha-border-width: 0px;
}
</style>
