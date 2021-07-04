<script setup lang="ts">
import { useDebounceFn, useEventListener, useResizeObserver } from "@vueuse/core";
import { computed, defineProps, onMounted, ref } from "vue";

const props = defineProps({
  letter: {
    type: String,
    required: true,
  }
})

const space = computed(() => props.letter === " ")

const letter = ref<HTMLElement | null>(null)
const style = ref({ width: "20px" })
const beforeEnter = (el: Element) => {
  style.value = { width: `${el.scrollWidth}px` }
}

const setInitialSize = () => {
  if (!letter.value) throw Error("letter ref falsy")

  style.value.width = `${letter.value.scrollWidth}px`
}

onMounted(setInitialSize)
useEventListener(window, "resize", useDebounceFn(setInitialSize, 250))
</script>

<template>
  <div :class="{ space }" :style="style" class="wrap">
    <transition name="letter" @enter="beforeEnter">
      <div :key="props.letter" ref="letter">{{ props.letter }}</div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
div.wrap {
  --transition: 250ms var(--ease-in-out);
  --move-by: 0.125em;

  width: 1ch;
  height: 1.4em;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: var(--transition);

  &.space {
    width: 0.5ch !important;
  }

  > div {
    position: absolute;
    &.letter-enter-active,
    &.letter-leave-active {
      transition: var(--transition);
    }

    &.letter-enter-from,
    &.letter-leave-to {
      opacity: 0;
      transform: translateY(var(--move-by));
    }

    &.letter-enter-from {
      transform: translateY(calc(var(--move-by) / -1));
    }
  }
}
</style>