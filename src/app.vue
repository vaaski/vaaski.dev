<script lang="ts">
import { defineComponent } from "vue"
import navbar from "./components/navbar.vue"

export default defineComponent({
  components: { navbar },
  setup() {},
})
</script>

<template>
  <div class="h-screen w-screen">
    <nav id="nav">
      <navbar />
    </nav>

    <div id="route">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
* {
  user-select: none;
}

::-webkit-scrollbar {
  display: none;
}

#app,
body,
html {
  @apply bg-clr-bg text-clr-white font-sans;
  @apply overflow-x-hidden;
}

nav#nav {
  @apply h-nav w-full top-0 fixed;
  @apply px-10;
  @apply bg-clr-bg-trans;

  backdrop-filter: blur(4px);
}

#route {
  @apply h-full w-full;

  > main {
    @apply w-full;

    &:not(.full) {
      @apply pt-nav;
    }
  }
}
</style>