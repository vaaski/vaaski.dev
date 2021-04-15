<template>
  <a :href="href" title="opens in new tab" target="_blank" class="flex items-center" rel="noopener noreferrer">
    <slot></slot>
    <svg-icon name="external" class="ml-1 inline-block" />
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import SvgIcon from "@/components/svg-icon.vue"

export default defineComponent({
  components: { SvgIcon },
  props: {
    href: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return { href: props.href }
  },
})
</script>

<style scoped>
a > svg {
  height: 0.9em;
  width: 0.9em;
}
</style>