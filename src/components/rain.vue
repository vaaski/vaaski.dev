<template>
  <div class="rain">
    <div v-for="container in containers" :key="container" :class="[`rain-${container}`]">
      <div
        class="raindrop"
        v-for="drop in amount / 2"
        :key="drop"
        :style="{ left: `${random(0, 150)}%`, 'animation-delay': `${random(0, -2000)}ms`, height: `${random(75, 150)}px`, opacity: `${random(50, 75)}%` }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    amount: 80,
    containers: ["front", "back"],
  }),
  methods: {
    random: (min, max, fix = 2) =>
      Number((Math.random() * (max - min) + min).toFixed(fix)),
  },
}
</script>

<style lang="stylus">
.rain
  height: 100%
  width: 100%
  position: relative

  .rain-front
    transform: skewX(-10deg)

  .rain-back
    transform: skewX(-15deg)
    opacity: 0.5

  .raindrop
    height: 75px
    width: 2px
    background: rgba(255, 255, 255, 0.1)
    position: absolute
    left: 0
    top: -150px
    animation: 2000ms rain linear infinite

@keyframes rain
  0
    transform: translateY(-200px)

  50%
    transform: translateY(150vh)

  100%
    transform: translateY(150vh)
</style>