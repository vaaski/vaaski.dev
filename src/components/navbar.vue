<template>
  <nav :class="{ expanded }" @keydown.esc="expand(false)">
    <div class="overlay" @click="expand(false)"></div>
    <div
      class="hamburger"
      tabindex="0"
      @keydown.enter="expand()"
      @click="expand()"
      @keydown.space="expand()"
    >
      <div class="line upper"></div>
      <div class="line center"></div>
      <div class="line lower"></div>
    </div>
    <div class="routes" ref="routes" @click="expand(false)">
      <template v-for="({ text, to, title, hr }, i) in navigation">
        <hr v-if="hr" :key="hr+i" :style="{ 'transition-delay': `${i * 50}ms` }" />
        <router-link
          class="link"
          v-else-if="!to.startsWith('https://')"
          :key="to"
          :to="to"
          :style="{ 'transition-delay': `${i * 50}ms, 0s, 50ms` }"
          :title="title"
          @click.native="expanded = false"
          @focus.native="expand(true)"
        >{{ text }}</router-link>
        <a
          v-else
          target="_blank"
          rel="noreferrer"
          :style="{ 'transition-delay': `${i * 50}ms, 0s, 50ms` }"
          class="link"
          :href="to"
          :key="to"
          :title="title"
          @focus="expand(true)"
        >{{ text }}</a>
      </template>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbar",
  data: () => ({
    expanded: false,
  }),
  methods: {
    expand(e) {
      console.log("espand")
      this.expanded = e === undefined ? !this.expanded : e
      if (!e) this.$refs.routes.children.forEach(c => c.blur())
    },
  },
  props: {
    navigation: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="stylus">
@import "../assets/globals"

$bezier = cubic-bezier(0.76, 0, 0.24, 1)

nav
  display: flex
  flex-direction: column
  transition: background 1s $bezier, width 1000ms linear
  padding: 24px
  width: 0

  >.overlay
    position: fixed
    height: 100vh
    width: 100vw
    top: 0
    left: 0
    background: linear-gradient(30deg, #19182d 0, #0c0c14 100%)
    opacity: 0
    transition: opacity 1s $bezier
    pointer-events: none

  >.hamburger
    z-index: 4
    // padding: 24px
    padding-bottom: 16px
    width: 24px
    transition: 1s $bezier
    transition-property: width, opacity
    opacity: 0.5
    align-self: flex-end
    cursor: pointer
    outline: none

    >.line
      height: 2px
      width: 100%
      background: $fg
      margin-bottom: 6px
      margin-left: auto
      transition: 1s $bezier
      transition-property: width, box-shadow
      box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0)

    &:focus>.line
      background: $focus
      box-shadow: 0 0 10px 0 $focus

  >.routes
    z-index: 4
    display: flex
    align-items: flex-end
    flex-direction: column
    width: 0
    transition: width 1s $bezier, opacity 750ms $bezier
    align-self: flex-end
    opacity: 0
    transition-delay: 0s
    pointer-events: none

    >hr
      border: none
      height: 1px
      width: 0
      background: $fg
      opacity: 0.25
      align-self: flex-end
      margin: 4px 0
      margin-right: 24px
      transition: 1s $bezier

    >.link
      margin: 4px 0
      font-size: 1.5em
      text-decoration: none
      position: relative
      margin-right: -24px
      transition: margin-right 1s $bezier, letter-spacing 100ms linear, padding-right 100ms linear, text-shadow 100ms linear
      letter-spacing: 0
      padding: 0
      white-space: nowrap
      font-weight: 300
      position: relative

      &:after
        content: "•"
        position: absolute
        width: 1ch
        left: calc(100% + 4px)
        opacity: 0
        transition: opacity 100ms linear, left 100ms linear

      @media only screen and (max-width: $mobile-break)
        margin: 8px 0

      &.router-link-exact-active
        font-weight: 400
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.75)

        &:after
          opacity: 0.75

      &:hover, &:focus
        letter-spacing: 1px
        padding-right: 4px
        font-weight: 500

        &:after
          left: 100%

  &.expanded
    width: 100%
    transition: background 1s $bezier, width 0s

    >.overlay
      opacity: 0.85
      pointer-events: unset

      @media only screen and (min-width: $mobile-break)
        opacity: 0.5

    >.hamburger
      width: calc(100% - 24px * 2)
      opacity: 1

      >.line
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.5)

        &.center
          width: 90%

        &.lower
          width: 80%

    >.routes
      width: 100%
      opacity: 1
      transition-delay: 300ms
      pointer-events: unset

      >hr
        width: 48px

      >.link
        margin-right: 24px
</style>