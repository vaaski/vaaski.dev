<script setup lang="ts">
import { ref, onMounted } from "vue"

const canvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (!canvas.value) throw Error("canvas ref is falsy")
  if (!canvas.value.getContext) return console.log("canvas.getContext is falsy")

  const ctx = canvas.value.getContext("2d")
  if (!ctx) throw Error("ctx is falsy")

  ctx.fillStyle = "rgb(200, 0, 0)"
  ctx.fillRect(10, 10, 50, 50)

  ctx.fillStyle = "rgba(0, 0, 200, 0.5)"
  ctx.fillRect(30, 30, 50, 50)
})
</script>

<template>
  <div class="background-rain">
    <canvas ref="canvas" height="500" width="500"></canvas>
  </div>
</template>

<style scoped lang="scss">
.background-rain {
  height: 100%;
  width: 100%;

  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
