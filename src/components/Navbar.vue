<template>
  <div class="flex h-full mx-auto w-full max-w-5xl items-center">
    <div
      @click="$router.push('/')"
      id="left"
      class="cursor-pointer flex h-full justify-center"
    >
      <Logo class="m-auto h-1/2" />
    </div>
    <div id="spacer" class="flex-grow"></div>
    <div id="right" class="flex child-space">
      <RouterLink to="/contact" class="transition-colors">contact</RouterLink>
      <RouterLink to="/time" class="transition-colors">time</RouterLink>
      <ExternalLink href="https://github.com/vaaski">github</ExternalLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Logo from "@/components/Logo.vue"
import ExternalLink from "@/components/ExternalLink.vue"

export default defineComponent({
  components: { Logo, ExternalLink },
  setup() {},
})
</script>

<style lang="postcss" scoped>
.child-space {
  > *:not(:last-child) {
    @apply mr-5;
  }
}

.router-link-exact-active {
  @apply text-clr-white opacity-50;
}
</style>