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
    <div class="bytesize">{{size}}</div>
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

  .bytesize
    font-size: 0.75em
    position: absolute
    padding: $padding
    bottom: 1px
    right: 1px
    border: 1px solid $disabled
    border-right: none
    border-bottom: none
    background: rgba(0, 0, 0, 0.25)
    backdrop-filter: blur(5px)
    border-radius: $border-radius-large 0 $border-radius-large 0
</style>