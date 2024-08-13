<script setup lang="ts">
import "@fontsource-variable/outfit"

useHead({ title: "vaaski.dev" })
useSeoMeta({
  title: "vaaski.dev",
  ogTitle: "vaaski.dev",
  description: "vaaski builds stuff for the web using typescript, vue and go",
  ogDescription: "vaaski builds stuff for the web using typescript, vue and go",
  ogImage: "https://vaaski.dev/og.png",
  twitterCard: "summary_large_image",
})
</script>

<template>
  <NavBar />
  <NuxtPage />
</template>

<style>
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

  animation: nav-bar-drop-in 2000ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: 2000ms;
}
</style>
