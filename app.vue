<script setup lang="ts">
import "@fontsource-variable/outfit"
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

#nav-bar {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
}
</style>
