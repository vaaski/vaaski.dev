<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    style="isolation:isolate"
    viewBox="150 290 700 420"
    :class="{ flicker }"
  >
    <path
      id="logo"
      d=" M 634.979 290 L 850 710 L 752.223 710 L 638.087 479.963 L 611.432 541.43 L 697.345 710 L 599.568 710 L 482.814 480.918 L 365.021 710 L 150 290 L 247.777 290 L 365.037 520.073 L 482.297 290 L 580.074 290 L 531.703 384.993 L 558.846 438.251 L 634.979 290 Z "
      :fill="color"
    />
  </svg>
</template>

<script>
const wait = t => new Promise(r => setTimeout(r, t))
const random = (min, max) => Math.random() * (max - min) + min

export default {
  name: "logo",
  data: () => ({
    flicker: false,
  }),
  props: {
    color: {
      default: "#fff",
      type: String,
    },
  },
  methods: {
    async rFlicker() {
      this.flicker = true
      await wait(4e3)

      this.flicker = false
      await wait(random(3e3, 10e3))

      this.rFlicker()
    },
  },
  mounted() {
    this.rFlicker()
  },
}
</script>

<style lang="stylus">
random(a, b)
  return math(math(0, "random") * (b - a + 1) + a, "floor")

svg
  filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.25))

  &.flicker
    animation: 1.5s flicker steps(100, jump-start) backwards

@keyframes flicker
  for n in 1 .. 50
    {2% * n}
      filter: drop-shadow(0 0 30px rgba(255, 255, 255, (random(0, 50) / 100)))
</style>