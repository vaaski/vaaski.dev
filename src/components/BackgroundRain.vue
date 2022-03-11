<script setup lang="ts">
import { ref, onMounted } from "vue"
</script>

<template>
  <div class="background-rain"></div>
</template>

<style scoped lang="scss">
.background-rain {
  position: absolute;
  height: 100%;
  width: 100%;
  background: var(--clr-bg);
  background: radial-gradient(
      114.65% 101.91% at 46.6% -41.6%,
      #3d5e7a 0%,
      rgba(22, 40, 55, 0) 100%
    ),
    radial-gradient(
      113.08% 100.52% at 150.44% 20.22%,
      rgba(11, 22, 31, 0.51) 0%,
      rgba(22, 40, 55, 0) 100%
    ),
    radial-gradient(
      96.96% 86.19% at -29.13% 72.24%,
      rgba(11, 22, 31, 0.51) 0%,
      rgba(22, 40, 55, 0) 100%
    ),
    radial-gradient(
      143.58% 127.62% at 69.77% 127.62%,
      rgba(0, 63, 116, 0.42) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    black;
  z-index: -1;

  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
