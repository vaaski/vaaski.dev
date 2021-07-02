<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  setup() {},
})
</script>

<template>
  <main class="mx-auto full">
    <section class="flex flex-col h-screen justify-center">
      <div class="max-width">
        <p class="font-mono text-clr-accent-blue -sm:text-xs">hi, i'm vaaski.</p>
        <h1 class="mt-1 text-4xl -sm:text-2xl">
          i build stuff for the web <br />
          using typescript, node and vue.
        </h1>
      </div>
    </section>

    <section class="bg-gradient-to-t from-gray-900">
      <div class="flex h-full max-width items-center justify-center">
        <p class="font-mono font-light opacity-50">coming soon</p>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
section {
  @apply w-full px-10 mx-auto;
  height: calc(100vh - var(--nav-height));

  &:first-child {
    height: 100vh;
  }

  > .max-width {
    @apply max-w-5xl mx-auto w-full;
  }
}
</style>