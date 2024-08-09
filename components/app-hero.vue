<script setup lang="ts">
const hero = ref<HTMLDivElement>()

const { width, height } = useElementSize(hero)
</script>

<template>
  <div id="app-hero" ref="hero">
    <div class="content">
      <VaaskiLogo class="logo" />
      <div class="tagline">
        i build stuff for the web
        <br />
        using typescript, vue and go
      </div>
    </div>
    <div class="backdrop"></div>
    <StarryBackdrop class="starry-backdrop" :width="width" :height="height" />

    <div class="bottom-rounder"></div>
  </div>
</template>

<style scoped lang="scss">
#app-hero {
  height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .starry-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    z-index: 1;
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
        91.96% 141.6% at -22.42% 69.4%,
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
      ),
      radial-gradient(
        56.68% 87.27% at 27.94% 112.07%,
        rgba(0, 255, 224, 0.43) 0%,
        rgba(0, 0, 0, 0) 100%
      );
  }
}

.content {
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 4rem;
}

.logo {
  max-width: min(320px, 75vw);
}

.tagline {
  max-width: 80vw;
  font-size: 2.5rem;
  font-weight: 250;
  color: hsla(0, 0%, 100%, 0.75);
  text-shadow: 0 0 36px hsla(0, 0%, 100%, 0.25);
}

.bottom-rounder {
  --curve-height: 20px;
  --extra-height: 10px;
  --curve-color: black;

  z-index: 3;
  position: absolute;
  bottom: var(--extra-height);
  width: 100%;
  height: var(--curve-height);
  background: var(--curve-color);
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  box-shadow: 0 0 75px hsla(0, 0%, 100%, 0.25);

  &::after {
    position: absolute;
    content: "";
    top: var(--curve-height);
    height: var(--extra-height);
    width: 100%;
    background: var(--curve-color);
  }
}

@media (max-width: 900px) {
  .content {
    margin-top: 4rem;
    flex-direction: column;
    text-align: center;
  }

  .tagline {
    font-size: 1.75rem;
  }

  .bottom-rounder {
    --curve-height: 10px;
  }
}
</style>
