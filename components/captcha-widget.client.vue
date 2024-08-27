<script setup lang="ts">
import "altcha"

const altchaWidget = ref<HTMLElement>()
const properties = defineProps({
	payload: {
		type: String,
		default: "",
	},
})
const emit = defineEmits<(event: "update:payload", value: string) => void>()
const internalValue = ref(properties.payload)

watch(internalValue, (v) => {
	emit("update:payload", v || "")
})

const onStateChange = (event_: CustomEvent | Event) => {
	if ("detail" in event_) {
		const { payload, state } = event_.detail
		internalValue.value = state === "verified" && payload ? payload : ""
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
