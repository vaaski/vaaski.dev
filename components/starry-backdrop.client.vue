<script setup lang="ts">
const canvas = ref<HTMLCanvasElement>()

const properties = defineProps<{
	width: number
	height: number
}>()

const { width, height } = toRefs(properties)
const { pixelRatio } = useDevicePixelRatio()
const scaledWidth = computed(() => width.value * pixelRatio.value)
const scaledHeight = computed(() => height.value * pixelRatio.value)

const X_SPEED = 0.1

onMounted(async () => {
	await nextTick() // https://nuxt.com/docs/guide/directory-structure/components#client-components
	if (!canvas.value) throw new Error("canvas is not defined")

	const context = canvas.value.getContext("2d")
	if (!context) throw new Error("canvas context is not defined")

	const genStars = () => {
		const amount = Math.floor((width.value * height.value) / 4500)
		return Array.from({ length: amount })
			.fill(0)
			.map(() => ({
				x: Math.random() * scaledWidth.value,
				y: Math.random() * scaledHeight.value + scaledHeight.value - 20,
				size: Math.random() * 1.5 + 0.25,
				speedY: (Math.random() * 0.25 + 0.05) * pixelRatio.value,
				speedX: Math.random() * X_SPEED - X_SPEED / 2,
			}))
	}

	let stars = genStars()
	/** face in stars on re-init */
	let opacityOverride = 0

	const generateNewStars = useDebounceFn(() => {
		stars = genStars()
	}, 200)

	watch([width, height], () => {
		opacityOverride = 0
		generateNewStars()
	})

	const draw = () => {
		context.clearRect(0, 0, scaledWidth.value, scaledHeight.value)

		if (opacityOverride < 1) opacityOverride += 0.005

		for (const star of stars) {
			/** fade out stars on their way up */
			const posOpacity = star.y / scaledHeight.value

			context.beginPath()
			context.fillStyle = `hsla(0, 0%, 100%, ${
				(star.size / 7.5) * posOpacity * opacityOverride
			})`
			context.arc(star.x, star.y, star.size * pixelRatio.value, 0, Math.PI * 2)
			context.fill()

			star.y -= star.speedY
			star.x += star.speedX

			if (star.y < -star.size) {
				star.y = scaledHeight.value + star.size
			} else if (star.x > scaledWidth.value || star.x < 0) {
				star.speedX *= -1
			}
		}

		requestAnimationFrame(draw)
	}

	draw()
})
</script>

<template>
	<canvas
		ref="canvas"
		:width="width * pixelRatio"
		:height="height * pixelRatio"
		:style="{ width: `${width}px`, height: `${height}px` }"
	/>
</template>
