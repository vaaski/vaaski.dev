<template>
  <transition-group name="text" tag="div" class="transition-text">
    <span v-for="(letter, i) in prefix" :key="'prefix' + letter + i" class="prefix">{{
      letter
    }}</span>

    <span
      v-for="(letter, i) in text"
      :key="'letter' + letter + i"
      class="letter"
      :class="{ number: !isNaN(letter) }"
    >
      {{ letter }}
    </span>

    <span v-for="(letter, i) in suffix" :key="'suffix' + letter + i" class="suffix">{{
      letter
    }}</span>
  </transition-group>
</template>

<script>
export default {
  name: "transition-text",
  data: () => ({
    text: [],
  }),
  props: {
    input: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      default: "",
    },
    suffix: {
      type: String,
      default: "",
    },
  },
  watch: {
    input(n) {
      this.text = n.split("")
    },
  },
}
</script>

<style lang="stylus">
@import "../assets/globals"

@keyframes fadeIn
  0%
    opacity: 0

  100%
    opacity: 1

.transition-text
  display: flex
  opacity: 0
  animation: fadeIn 500ms ease 500ms forwards

  > .letter, .prefix, .suffix
    width: 1ch
    display: inline-block
    opacity: 0.75

    &.number
      font-weight: 500
      opacity: 1
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.2)
      @media screen and (max-width: $mobile-break)
        text-shadow: 0 0 15px rgba(255, 255, 255, 0.333)

    &.text-enter-active, &.text-leave-active
      transition: 500ms $easeLong

    &.text-enter
      opacity: 0
      width: 0

      &.letter
        transform: translate(-1ch, -0.5em)

    &.text-leave-to
      opacity: 0
      width: 0

      &.letter
        transform: translate(0, 0.5em)
</style>