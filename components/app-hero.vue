<template>
  <div id="app-hero">
    <div class="content">
      <VaaskiLogo class="logo" />
      <div class="tagline">
        i build stuff for the web
        <br />
        using typescript, vue and go
      </div>
    </div>
    <div class="backdrop"></div>
    <div class="logo-glow"></div>
    <div class="navlight"></div>

    <div class="bottom-rounder"></div>
  </div>
</template>

<style scoped>
#app-hero {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .content {
    z-index: 4;
    display: flex;
    align-items: center;
    gap: 4rem;
  }

  .backdrop,
  .logo-glow,
  .navlight {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .backdrop {
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

  .logo-glow {
    z-index: 2;
    opacity: 0.2;
    background: radial-gradient(
        25.31% 23.93% at 50% 50%,
        rgba(255, 255, 255, 0.43) 0%,
        rgba(0, 0, 0, 0) 100%
      ),
      radial-gradient(
        60.21% 50% at 50% 50%,
        rgba(255, 255, 255, 0.31) 0%,
        rgba(0, 0, 0, 0) 100%
      );
  }

  .navlight {
    z-index: 3;
    background: radial-gradient(
      50% 28.82% at 50% 0%,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    opacity: 0.75;
  }
}

.logo {
  max-width: 320px;
  height: auto;
  filter: drop-shadow(0 0 32px hsla(274, 100%, 90%, 0.3));
}

.tagline {
  font-size: 2.5rem;
  font-weight: 250;
  color: hsla(0, 0%, 100%, 0.75);
  text-shadow: 0 0 36px hsla(0, 0%, 100%, 0.25);
}

.bottom-rounder {
  --curve-height: 25px;
  --extra-height: 20px;
  --curve-color: black;

  z-index: 4;
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
</style>
