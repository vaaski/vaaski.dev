<template>
  <div class="vaaski-logo">
    <svg
      width="700"
      height="421"
      viewBox="0 0 700 421"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M484.979 0.823486L700 420.823H602.223L488.087 190.786L461.432 252.253L547.345 420.823H449.568L332.814 191.741L215.021 420.823L0 0.823486H97.777L215.037 230.896L332.297 0.823486H430.074L381.703 95.8165L408.846 149.074L484.979 0.823486Z"
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
  width: 100vw;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  opacity: 0.2;
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
