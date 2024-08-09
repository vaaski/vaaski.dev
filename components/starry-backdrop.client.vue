<script setup lang="ts">
const canvas = ref<HTMLCanvasElement>()

const { width, height } = useWindowSize()

// todo: start fade in on resize or fix ios scrolling issue

const X_SPEED = 0.1

onMounted(async () => {
  await nextTick() // https://nuxt.com/docs/guide/directory-structure/components#client-components
  if (!canvas.value) throw new Error("canvas is not defined")

  const ctx = canvas.value.getContext("2d")
  if (!ctx) throw new Error("canvas context is not defined")

  const genStars = () => {
    const amount = Math.floor((width.value * height.value) / 4500)
    return new Array(amount).fill(0).map(() => ({
      x: Math.random() * width.value,
      y: Math.random() * height.value,
      size: Math.random() * 2 + 1,
      speedY: Math.random() * 0.5 + 0.1,
      speedX: Math.random() * X_SPEED - X_SPEED / 2,
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

      star.y -= star.speedY
      star.x += star.speedX

      if (star.y < -star.size) {
        star.y = height.value + star.size
      } else if (star.x > width.value || star.x < 0) {
        star.speedX *= -1
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
