<script setup lang="ts">
const canvas = ref<HTMLCanvasElement>()

const { width, height } = useWindowSize()

onMounted(async () => {
  await nextTick()
  if (!canvas.value) throw new Error("canvas is not defined")

  const ctx = canvas.value.getContext("2d")
  if (!ctx) throw new Error("canvas context is not defined")

  const genStars = () => {
    const amount = Math.floor((width.value * height.value) / 2500)
    console.log("star amount", amount)
    return new Array(amount).fill(0).map(() => ({
      x: Math.random() * width.value,
      y: Math.random() * height.value,
      size: Math.random() * 0.75 + 0.75,
      speed: Math.random() * 0.125 + 0.125,
    }))
  }

  let stars = genStars()

  window.addEventListener("resize", () => {
    stars = genStars()
  })

  const draw = () => {
    ctx.clearRect(0, 0, width.value, height.value)

    for (const star of stars) {
      const opacity = star.y / height.value

      ctx.beginPath()
      ctx.fillStyle = `hsla(0, 0%, 100%, ${(star.size / 7.5) * opacity})`
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
      ctx.fill()

      star.y -= star.speed

      if (star.y < -star.size) {
        star.y = height.value + star.size
      }
    }

    requestAnimationFrame(draw)
  }

  draw()
})
</script>

<template>
  <canvas ref="canvas" :width="width" :height="height"></canvas>
</template>

<style scoped>
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
canvas {
  animation: fade-in 2000ms forwards;
}
</style>
