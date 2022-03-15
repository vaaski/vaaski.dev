<script setup lang="ts">
import { ref, onMounted } from "vue"
</script>

<template>
  <div class="background-rain"></div>
</template>

<style scoped lang="scss">
.background-rain {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  min-width: 100vw;
  background: var(--clr-bg);
  background: var(--bg-gradient);
  z-index: -1;
  transition: height var(--route-transition);
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 640px) {
    min-width: 120vw;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
