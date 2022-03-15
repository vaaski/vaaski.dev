<script setup lang="ts">
import { useDebounceFn, useEventListener } from "@vueuse/core"
import { computed, defineProps, onMounted, ref } from "vue"

const props = defineProps({
  letter: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 250,
  },
})

const space = computed(() => props.letter === " ")
const transition = computed(() => `${props.duration}ms`)

const letter = ref<HTMLElement | null>(null)
const style = ref({ width: "0px", "animation-play-state": "paused" })
const beforeEnter = (el: Element) => {
  style.value.width = `${el.scrollWidth}px`
}

const setInitialSize = () => {
  if (!letter.value) throw Error("letter ref falsy")

  style.value.width = `${letter.value.scrollWidth}px`
  style.value["animation-play-state"] = "running"
}

onMounted(setInitialSize)
// todo set transition to 0 while resizing
useEventListener(window, "resize", useDebounceFn(setInitialSize, 250))
</script>

<template>
  <div :class="{ space }" :style="style" class="wrap">
    <Transition name="change" @enter="beforeEnter">
      <div :key="props.letter" ref="letter">{{ props.letter }}</div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

div.wrap {
  --transition-duration: v-bind(transition);
  --transition: var(--transition-duration) var(--ease-in-out);
  --move-by: 0.125em;

  width: 1ch;
  height: 1.4em;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: var(--transition);
  opacity: 0;
  animation: fadeIn var(--transition) var(--transition-duration) forwards;
  animation-play-state: paused;

  &.space {
    width: 0.5ch !important;
  }

  > div {
    position: absolute;
    &.change-enter-active,
    &.change-leave-active {
      transition: var(--transition);
    }

    &.change-enter-from,
    &.change-leave-to {
      opacity: 0;
      transform: translateY(var(--move-by));
    }

    &.change-enter-from {
      transform: translateY(calc(var(--move-by) / -1));
    }
  }
}
</style>
