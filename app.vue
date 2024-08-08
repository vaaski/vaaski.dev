<script setup lang="ts">
import "@fontsource-variable/outfit"
</script>

<template>
  <NavBar />
  <AppHero />
  <div>something else</div>
</template>

<style>
html,
body,
#__nuxt {
  margin: 0;
  height: 100%;
  background: #000;
  color: #fff;
  font-family: sans-serif;
  position: relative;
  font-family: "Outfit Variable", sans-serif;
  overflow-x: hidden;
}

a {
  all: unset;
  cursor: pointer;
}

#nav-bar {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
