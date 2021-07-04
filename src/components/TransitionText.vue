<script lang="ts" setup>
import { computed } from "vue"
import TransitionChar from "./TransitionChar.vue";

const props = defineProps({
  text: {
    required: true,
    type: String
  }
})

const split = computed(() => props.text.split(""))
</script>

<template>
  <div class="flex">
    <TransitionChar v-for="(letter, i) in split" :letter="letter" :key="i" />
  </div>
</template>