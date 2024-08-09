<script setup lang="ts">
import anime from "animejs"

const logoStages = [
  "M.5 0 .5 0 .5 0 .5 0 .5 0 .5 0 .5 0 .5 0 .5 0 43.9409 0 43.9409 0 43.9409 0 .5 0 .5 0 .5 0 .5 0 .5 0 .5 0Z",
  "M96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186 .5 0 43.9409 0 96.0379 101.889 96.0379 101.889 96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186Z",
  "M170.085 42.0683 170.085 42.0683 170.085 42.0683 170.085 42.0683 170.085 42.0683 148.365 84.5494 148.365 84.5494 96.0308 186 .5 0 43.9409 0 96.0379 101.889 148.135 0 191.576 0 170.085 42.0683 170.085 42.0683 170.085 42.0683 170.085 42.0683 170.085 42.0683Z",
  "M205.508 111.348 205.508 111.348 205.508 111.348 205.508 111.348 243.678 186 200.237 186 148.365 84.5494 96.0308 186 .5 0 43.9409 0 96.0379 101.889 148.135 0 191.576 0 170.085 42.0683 182.144 65.654 182.144 65.654 205.508 111.348 205.508 111.348Z",
  "M239.394 45.6091 218.422 86.2804 218.422 86.2804 205.508 111.348 243.678 186 200.237 186 148.365 84.5494 96.0308 186 .5 0 43.9409 0 96.0379 101.889 148.135 0 191.576 0 170.085 42.0683 182.144 65.654 215.969 0 239.394 45.6091 239.394 45.6091Z",
  "M311.5 186 268.059 186 218.422 86.2804 205.508 111.348 243.678 186 200.237 186 148.365 84.5494 96.0308 186 .5 0 43.9409 0 96.0379 101.889 148.135 0 191.576 0 170.085 42.0683 182.144 65.654 215.969 0 239.394 45.6091 311.5 186Z",
]

const duration = 2000
const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a
const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a))
const invlerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x))
const range = (x1: number, y1: number, x2: number, y2: number, a: number) =>
  lerp(x2, y2, invlerp(x1, y1, a))

const easing = (x: number) => {
  return 1 - (1 - x) ** 4
}

const path = ref<SVGPathElement>()
onMounted(() => {
  if (!path.value) throw new Error("path is not defined")

  const baseAnimation = anime({
    targets: path.value,
    d: logoStages.map((stage) => ({ value: stage })),
    easing: "linear",
    autoplay: false,
    duration,
  })

  window.baseAnimation = baseAnimation

  anime({
    targets: baseAnimation,
    duration,
    // direction: "alternate",
    // loop: true,
    update: (anim) => {
      const eased = easing(anim.progress / 100)
      const absolute = baseAnimation.duration * eased
      const deadzone = duration / logoStages.length
      const progress = range(
        0,
        baseAnimation.duration,
        deadzone,
        baseAnimation.duration,
        absolute,
      )

      baseAnimation.seek(progress)
    },
  })
})
</script>

<template>
  <div class="vaaski-logo">
    <svg
      width="312"
      height="186"
      viewBox="0 0 312 186"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path ref="path" :d="logoStages[0]" fill="white" />
    </svg>

    <div class="logo-glow"></div>
  </div>
</template>

<style scoped>
.vaaski-logo {
  position: relative;
}

svg {
  max-width: 100%;
  height: auto;
}

.logo-glow {
  position: absolute;
  height: 100vh;
  aspect-ratio: 4 / 3;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  opacity: 0.2;
  pointer-events: none;
  background: radial-gradient(
      25.31% 23.93% at 50% 50%,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    radial-gradient(
      50% 50% at 50% 50%,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(0, 0, 0, 0) 100%
    );
}
</style>
