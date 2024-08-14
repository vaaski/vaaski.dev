<script setup lang="ts">
const stages = [
  "M 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 0.5 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 Z",
  "M96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186 .5 0 43.9409 0 96.0379 101.889 96.0379 101.889 96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186Z",
  "M170.085 42.0683 170.085 42.0683 170.085 42.0683 170.085 42.0683 170.085 42.0683 148.365 84.5494 148.365 84.5494 96.0308 186 .5 0 43.9409 0 96.0379 101.889 148.135 0 191.576 0 170.085 42.0683 170.085 42.0683 170.085 42.0683 170.085 42.0683 170.085 42.0683Z",
  "M205.508 111.348 205.508 111.348 205.508 111.348 205.508 111.348 243.678 186 200.237 186 148.365 84.5494 96.0308 186 .5 0 43.9409 0 96.0379 101.889 148.135 0 191.576 0 170.085 42.0683 182.144 65.654 182.144 65.654 205.508 111.348 205.508 111.348Z",
  "M239.394 45.6091 218.422 86.2804 218.422 86.2804 205.508 111.348 243.678 186 200.237 186 148.365 84.5494 96.0308 186 .5 0 43.9409 0 96.0379 101.889 148.135 0 191.576 0 170.085 42.0683 182.144 65.654 215.969 0 239.394 45.6091 239.394 45.6091Z",
  "M311.5 186 268.059 186 218.422 86.2804 205.508 111.348 243.678 186 200.237 186 148.365 84.5494 96.0308 186 .5 0 43.9409 0 96.0379 101.889 148.135 0 191.576 0 170.085 42.0683 182.144 65.654 215.969 0 239.394 45.6091 311.5 186Z",
]

const values = computed(() => stages.join(";"))

const keySplines = computed(() => {
  return Array.from({ length: stages.length - 1 }, () => "0.87 0 0.13 1").join(";")
})

const keyTimes = computed(() => {
  const stepSize = 1 / (stages.length - 1)
  return Array.from({ length: stages.length }, (_, i) => {
    return Math.min(i * stepSize, 1)
  })
    .map((v) => Math.floor(v * 100) / 100)
    .join(";")
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
      <path ref="path" fill="white">
        <animate
          attributeName="d"
          begin="250ms"
          dur="750ms"
          fill="freeze"
          calcMode="spline"
          :keySplines="keySplines"
          :keyTimes="keyTimes"
          :values="values"
        ></animate>
      </path>
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
  filter: drop-shadow(0 0 32px hsla(274, 100%, 90%, 0.3));
  -webkit-transform: translateZ(0);
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
