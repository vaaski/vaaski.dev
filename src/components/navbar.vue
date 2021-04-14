<template>
  <div class="flex h-full mx-auto w-full max-w-5xl items-center">
    <div id="left" class="flex h-full justify-center">
      <logo class="m-auto h-1/2" />
    </div>
    <div id="spacer" class="flex-grow"></div>
    <div id="right">github</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import logo from "@/components/logo.vue"

export default defineComponent({
  components: { logo },
  setup() {},
})
</script>
