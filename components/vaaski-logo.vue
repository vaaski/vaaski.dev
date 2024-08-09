<template>
  <div class="vaaski-logo">
    <svg
      width="311"
      height="186"
      viewBox="0 0 311 186"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M311 186H267.559L217.922 86.2804L205.008 111.348L243.178 186H199.737L147.865 84.5494L95.5308 186L0 0H43.4409L95.5379 101.889L147.635 0H191.076L169.585 42.0683L181.644 65.654L215.469 0L236.044 40.0585L311 186Z"
        fill="white"
      />
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
