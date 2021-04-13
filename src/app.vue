<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  setup() {},
})
</script>

<template>
  <div class="h-screen w-screen">
    <nav id="nav">
      <div class="flex h-full mx-auto w-full max-w-5xl items-center">
        <div id="left">vaaski</div>
        <div id="spacer" class="flex-grow"></div>
        <div id="right">github</div>
      </div>
    </nav>

    <div id="route">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  @apply bg-clr-bg text-clr-white;
}

nav#nav {
  @apply h-16 w-full top-0 fixed;
  @apply px-5;
  @apply ring-clr-dark ring-2;
  @apply bg-clr-bg;
}
</style>