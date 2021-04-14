<template>
  <div class="flex h-full mx-auto w-full max-w-5xl items-center">
    <div id="left" class="flex h-full justify-center">
      <logo class="m-auto h-1/2" />
    </div>
    <div id="spacer" class="flex-grow"></div>
    <div id="right">
      <external-link href="https://github.com/vaaski">github</external-link>
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
