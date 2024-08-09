<script setup lang="ts">
useHead({ title: "vaaski.dev // contact" })
</script>

<template>
  <main>
    <div class="panel">
      <NuxtPage />
    </div>
    <div class="backdrop"></div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.panel {
  z-index: 4;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 3rem;
  width: 100%;
  max-width: min(600px, 90vw);

  background: radial-gradient(
    157.14% 157.14% at 67.21% -25.11%,
    rgba(255, 255, 255, 0.06) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.125);
  border-radius: 2rem;
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  z-index: 1;
  opacity: 0.5;

  background: radial-gradient(
      72.09% 111% at -20.75% 100%,
      rgba(127, 0, 255, 0.46) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    radial-gradient(
      84.26% 129.74% at 50% 125.36%,
      rgba(255, 0, 230, 0.46) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    radial-gradient(
      58.7% 90.38% at 113.99% 96.18%,
      rgba(255, 0, 107, 0.43) 0%,
      rgba(0, 0, 0, 0) 100%
    );
}
</style>
