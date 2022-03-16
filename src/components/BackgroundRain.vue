<script setup lang="ts">
// import { usePreferredDark } from "@vueuse/core"
import { computed, toRefs, defineProps } from "vue"

const props = defineProps({
  rainWidth: {
    type: Number,
    required: true,
  },
  rainHeight: {
    type: Number,
    required: true,
  },
  rainSpeed: {
    type: Number,
    default: 1800,
  },
  rainDropHeight: {
    type: Number,
    default: 50,
  },
  rainDropSway: {
    type: Number,
    default: 200,
  },
  rainMultiplier: {
    type: Number,
    default: 1,
  },
})

const { rainDropHeight, rainSpeed, rainDropSway, rainWidth } = toRefs(props)
const dropHeight = computed(() => `${rainDropHeight.value}px`)

const CALIBRATED_SCREEN_WIDTH = 2040
const rainDropCount = computed(() => {
  const multiplier = 180 * props.rainMultiplier
  const adjustedToWidth = multiplier * (rainWidth.value / CALIBRATED_SCREEN_WIDTH)

  return Math.floor(adjustedToWidth)
})

const randomNumber = (m = 0, M = 1) => Math.random() * (M - m) + m
const randomFloor = (m = 0, M = 1) => Math.floor(Math.random() * (M - m) + m)
const randomPM = (base: number, sway: number) => randomFloor(base - sway, base + sway)

// const isDark = usePreferredDark()
const isDark = { value: true }

const rainDropProperties = () => ({
  left: `${randomFloor(0, 100)}%`,
  animationDelay: `-${randomFloor(0, rainSpeed.value)}ms`,
  animationDuration: `${randomPM(rainSpeed.value, rainDropSway.value)}ms`,
  background: isDark.value
    ? `linear-gradient(to top, rgba(255, 255, 255, ${randomNumber(0.5, 1)}) 20%, transparent)`
    : `linear-gradient(to top, rgba(0, 0, 0, ${randomNumber(0.5, 1)}) 20%, transparent)`,
})
</script>

<template>
  <div class="background-rain" :style="{ height: `${rainHeight}px`, width: `${rainWidth}px` }">
    <div class="rain-container" style="transform: skew(-15deg) translateX(-32%)">
      <div
        v-for="drop in Math.floor(rainDropCount / 2)"
        :key="drop"
        class="rain-drop"
        :style="rainDropProperties()"
      />
    </div>
    <div class="rain-container" style="transform: skew(-10deg) translateX(-21%)">
      <div
        v-for="drop in Math.floor(rainDropCount / 2)"
        :key="drop"
        class="rain-drop"
        :style="rainDropProperties()"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes fadeIn {
  from {
    opacity: 0;
  }
}

@keyframes rain {
  0% {
    top: calc(v-bind("dropHeight") * -1);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 1;
  }
}

.background-rain {
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  min-width: 100vw;
  background: var(--clr-bg);
  background: var(--bg-gradient);
  z-index: 1;
  transition: height var(--route-transition);

  @media (max-width: 640px) {
    min-width: 120vw;
    left: 50%;
    transform: translateX(-50%);
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
}

.rain-container {
  position: absolute;
  height: 300vh;
  width: 130%;
  top: 0;
  overflow: hidden;
  opacity: 0.15;
  animation: fadeIn 5s linear forwards;

  .rain-drop {
    position: absolute;
    height: v-bind("dropHeight");
    width: 2px;
    border-radius: 2px;
    background: linear-gradient(to top, rgba(255, 255, 255, 1) 20%, transparent);

    animation: rain 0ms linear infinite;
  }
}
</style>
