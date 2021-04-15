<template>
  <div class="flex h-full mx-auto w-full max-w-5xl items-center">
    <div id="left" class="flex h-full justify-center">
      <logo class="m-auto h-1/2" />
    </div>
    <div id="spacer" class="flex-grow"></div>
    <div id="right" class="flex child-space">
      <router-link to="/contact">contact</router-link>
      <external-link href="https://github.com/vaaski"
        >github</external-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Logo from "@/components/logo.vue"
import ExternalLink from "@/components/external-link.vue"

export default defineComponent({
  components: { Logo, ExternalLink },
  setup() {},
})
</script>

<style lang="scss" scoped>
.child-space {
  > *:not(:last-child) {
    @apply mr-5;
  }
}
</style>