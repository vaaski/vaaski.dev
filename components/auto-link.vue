<script setup lang="ts">
import type {
	RouteLocationAsPathGeneric,
	RouteLocationAsRelativeGeneric,
} from "vue-router"

const properties = defineProps<{
	to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
}>()

const target = computed(() => {
	if (typeof properties.to === "string" && properties.to.startsWith("http")) {
		return "_blank"
	}
})
</script>

<template>
	<NuxtLink :to="properties.to" :target="target">
		<slot></slot>
	</NuxtLink>
</template>
