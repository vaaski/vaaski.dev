<script lang="ts" setup>
import { ref } from "vue"
import { useEventListener } from "@vueuse/core"
import Navbar from "@/components/Navbar.vue"
import BackgroundRain from "@/components/BackgroundRain.vue"

const backgroundRainHeight = ref<number | undefined>(undefined)
let lastEnteredRouteEl: Element | null = null

const setBackgroundRainHeight = () => {
  backgroundRainHeight.value = lastEnteredRouteEl?.scrollHeight
}

useEventListener(window, "resize", setBackgroundRainHeight)

const onRouteEnter = (el: Element) => {
  lastEnteredRouteEl = el
  setBackgroundRainHeight()
}
</script>

<template>
  <div class="h-screen w-screen">
    <nav id="nav">
      <Navbar />
    </nav>

    <div id="route">
      <BackgroundRain :style="{ height: `${backgroundRainHeight}px` }" />
      <RouterView v-slot="{ Component }">
        <Transition @enter="onRouteEnter" name="fade">
          <Component :is="Component" />
        </Transition>
      </RouterView>
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
  @apply font-sans text-clr-white;
  @apply overflow-x-hidden;
}

nav#nav {
  @apply h-nav w-full top-0 z-10 fixed;
  @apply px-10;

  backdrop-filter: blur(4px);
}

#route {
  @apply w-full;
  position: relative;

  > main {
    @apply w-full;
    min-height: 100vh;

    &:not(.full) {
      @apply pt-nav;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: var(--route-transition);
  position: absolute;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
