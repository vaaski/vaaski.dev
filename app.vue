<script setup lang="ts">
import "@fontsource-variable/outfit"

useHead({
  title: "vaaski.dev",
})

useSeoMeta({
  title: "vaaski.dev",
  ogTitle: "vaaski.dev",
  description: "vaaski builds stuff for the web using typescript, vue and go",
  ogDescription: "vaaski builds stuff for the web using typescript, vue and go",
  ogImage: "https://vaaski.dev/og.png",
  twitterCard: "summary_large_image",
})

const route = useRoute()
</script>

<template>
  <NavBar :class="{ 'is-home': route.path === '/' }" />
  <NuxtPage />
  <div class="navlight"></div>
</template>

<style lang="scss">
html,
body,
#__nuxt,
main {
  margin: 0;
  background: #000;
  color: #fff;
  font-family: sans-serif;
  position: relative;
  font-family: "Outfit Variable", sans-serif;
  overflow-x: hidden;
}

main {
  min-height: 100svh;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: unset;
}

a {
  all: unset;
  cursor: pointer;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

@keyframes nav-bar-drop-in {
  to {
    top: 0;
    opacity: 1;
  }
}
#nav-bar {
  position: fixed;
  left: 50%;
  top: -4rem;
  opacity: 0;
  transform: translateX(-50%);

  &.is-home {
    animation: nav-bar-drop-in 2000ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: 2000ms;
  }

  &:not(.is-home) {
    top: 0;
    opacity: 1;
  }
}

.navlight {
  z-index: 4;
  background: radial-gradient(
    50% 28.82% at 50% 0%,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  opacity: 0.75;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}
</style>
