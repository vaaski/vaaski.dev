<script setup lang="ts">
const route = useRoute()

const { data: home } = await useAsyncData(route.path, () =>
	queryCollection("content").path(route.path.replace("/blog", "")).first(),
)

useSeoMeta({
	title: home.value?.title,
	description: home.value?.description,
})
</script>

<template>
	<ContentRenderer v-if="home" :value="home" />
	<div v-else>{{ route.path }} not found</div>
</template>
