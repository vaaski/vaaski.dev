<script lang="ts">
import { defineComponent } from "vue"
import Navbar from "./components/Navbar.vue"

export default defineComponent({
  components: { Navbar },
  setup() {},
})
</script>

<template>
  <div class="h-screen w-screen">
    <nav id="nav">
      <Navbar />
    </nav>

    <div id="route">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
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

input[type="text"],
textarea {
  @apply bg-clr-bg text-clr-white;
}

a.link {
  @apply text-clr-accent-blue;
}

.animate-underline {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 1px;
    width: 100%;
    height: 1px;
    background-color: var(--clr-accent-blue);
    transform-origin: center;
    transform: translate(-50%, 0) scaleX(0);
    transition: transform 0.3s ease-in-out;
  }

  &:hover::after {
    transform: translate(-50%, 0) scaleX(1);
  }
}

#app,
body,
html {
  @apply bg-clr-bg text-clr-white font-sans;
  @apply overflow-x-hidden;
}

nav#nav {
  @apply h-nav w-full top-0 fixed z-10;
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

.fade-enter-active,
.fade-leave-active {
  transition: 100ms;
  position: absolute;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>