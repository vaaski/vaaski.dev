<template>
  <div
    :class="{ hide }"
    class="flex h-full mx-auto text-clr-navbar w-full max-w-5xl items-center"
  >
    <RouterLink to="/" class="cursor-pointer flex h-full nav-left justify-center logo">
      <Logo class="m-auto h-1/2" />
    </RouterLink>
    <div class="flex-grow nav-spacer" />
    <div class="flex nav-right child-space">
      <RouterLink to="/contact" class="transition-colors">contact</RouterLink>
      <!-- <RouterLink to="/time" class="transition-colors">time</RouterLink> -->
      <ExternalLink href="https://github.com/vaaski">github</ExternalLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "@/components/Logo.vue"
import ExternalLink from "@/components/ExternalLink.vue"
import { fullscreen } from "@/util"

const hide = fullscreen.isFullscreen
</script>

<style lang="scss" scoped>
.child-space {
  > *:not(:last-child) {
    @apply mr-5;
  }
}

.router-link-exact-active:not(.logo) {
  @apply opacity-50;
}

.nav-right,
.nav-spacer,
.nav-left {
  transition: 500ms var(--ease-quart);
}

.hide {
  .nav-right {
    opacity: 0;
    width: 0;
  }
  .nav-left {
    opacity: 0.125;
    flex-grow: 1;
  }
  .nav-spacer {
    flex-grow: 0;
  }
}
</style>
