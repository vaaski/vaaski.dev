<script setup lang="ts">
import type {
	RouteLocationAsPathGeneric,
	RouteLocationAsRelativeGeneric,
} from "vue-router"

const properties = defineProps<{
	to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
}>()

const target = computed(() => {
	return typeof properties.to === "string" && properties.to.startsWith("http")
		? "_blank"
		: "_self"
})
</script>

<template>
	<NuxtLink :to="properties.to" :target="target">
		<slot />
	</NuxtLink>
</template>
