<script lang="ts" setup>
import { computed, nextTick } from "vue"
import TransitionChar from "./TransitionChar.vue"

const props = defineProps({
  text: {
    required: true,
    type: String,
  },
  duration: {
    type: Number,
    default: 250,
  },
})

const split = computed(() => props.text.split(""))

const wait = (t: number): Promise<void> => new Promise(r => setTimeout(r, t))
const leave = async (_el: Element, done: () => void) => {
  const el = _el as HTMLElement
  console.log(el)

  el.style.width = "0px"
  el.style.opacity = "1"
  el.style.animation = "none"
  await nextTick()
  el.style.opacity = "0"

  await wait(props.duration)
  done()
}
</script>

<template>
  <div class="flex">
    <TransitionGroup @leave="leave" :css="false">
      <TransitionChar v-for="(letter, i) in split" :letter="letter" :key="i" />
    </TransitionGroup>
  </div>
</template>
