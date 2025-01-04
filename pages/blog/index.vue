<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection("blog").all()
})

console.log(page)
</script>

<template>
	<main>
		<h1>blog home</h1>

		<NuxtLink v-for="item of page" :key="item.id" :to="'/blog' + item.path">
			{{ item.title }}
		</NuxtLink>
	</main>
</template>
