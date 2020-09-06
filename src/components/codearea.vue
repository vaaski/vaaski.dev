<template>
  <div class="codearea">
    <textarea
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
      :value="value"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
    ></textarea>
    <div class="bytesize">{{size}} ({{ value.length }} chars)</div>
    <div class="clear" v-if="clearable" @click="$emit('input', '')">clear</div>
  </div>
</template>

<script>
const { bytesize } = require("../assets/utils")

export default {
  name: "codearea",
  computed: {
    size() {
      return bytesize(this.value)
    },
  },
  props: {
    value: String,
    clearable: { type: Boolean, default: false },
  },
}
</script>

<style lang="stylus">
@import "../assets/globals"

.codearea
  $padding = 15px
  position: relative

  textarea
    height: "calc(100% - 2*%s - 2px)" % $padding
    width: "calc(100% - 2*%s - 2px)" % $padding
    padding: $padding

  .bytesize, .clear
    font-size: 0.75em
    position: absolute
    padding: $padding
    bottom: 1px
    right: 1px
    border: 1px solid $disabled
    border-right: none
    border-bottom: none
    background: rgba(0, 0, 0, 0.125)
    backdrop-filter: blur(5px)
    border-radius: $border-radius-large 0 $border-radius-large 0
    pointer-events: none

  .clear
    right: unset
    left: 1px
    pointer-events: unset
    border-radius: 0 $border-radius-large 0 $border-radius-large
    border: 1px solid $disabled
    border-bottom: none
    border-left: none
    cursor: pointer
    transition: 200ms $ease
</style>