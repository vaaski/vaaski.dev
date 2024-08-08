<script setup lang="ts">
const properties = defineProps<{
  to: string
}>()

const target = computed(() => {
  if (properties.to.startsWith("http")) return "_blank"
})
</script>

<template>
  <NuxtLink :to="properties.to" :target="target">
    <slot></slot>
  </NuxtLink>
</template>
