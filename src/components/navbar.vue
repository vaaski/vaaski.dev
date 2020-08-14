<template>
  <nav :class="{ expanded }">
    <div class="overlay" :class="{ expanded }"></div>
    <div class="hamburger" @click="expanded = !expanded">
      <div class="line upper"></div>
      <div class="line center"></div>
      <div class="line lower"></div>
    </div>
    <div class="routes">
      <template v-for="({ text, to }, i) in navigation">
        <router-link
          class="link"
          v-if="!to.startsWith('https://')"
          :key="to"
          :to="to"
          :style="{ 'transition-delay': `${i * 50}ms, 0s` }"
        >{{ text }}</router-link>
        <a
          v-else
          target="_blank"
          rel="noreferrer"
          :style="{ 'transition-delay': `${i * 50}ms, 0s` }"
          class="link"
          :href="to"
          :key="to"
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
  transition: background 1s $bezier

  >.overlay
    position: absolute
    height: 100%
    width: 100%
    background: linear-gradient(30deg, #19182d 0, #0c0c14 100%)
    opacity: 0
    transition: opacity 1s $bezier

    @media only screen and (min-width: $mobile-break)
      opacity: 0 !important

  >.hamburger
    z-index: 4
    padding: 24px
    padding-bottom: 16px
    width: 24px
    transition: 1s $bezier
    transition-property: width, opacity
    opacity: 0.5
    align-self: flex-end
    cursor: pointer

    >.line
      height: 2px
      width: 100%
      background: #dcdce0
      margin-bottom: 6px
      margin-left: auto
      transition: 1s $bezier
      transition-property: width, box-shadow
      box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0)

  >.routes
    z-index: 4
    display: flex
    align-items: flex-end
    flex-direction: column
    width: 0
    transition: width 1s $bezier, opacity 750ms $bezier
    align-self: flex-end
    opacity: 0
    padding: 0 24px
    transition-delay: 0

    >.link
      margin: 4px 0
      font-size: 1.5em
      text-decoration: none
      position: relative
      margin-right: -24px
      transition: margin-right 1s $bezier, letter-spacing 100ms linear, padding-right 100ms linear
      letter-spacing: 0
      padding: 0

      @media only screen and (max-width: $mobile-break)
        font-size: 2em
        margin: 8px 0

      &.router-link-exact-active
        font-weight: 300
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.75)

      &:hover
        letter-spacing: 2px
        padding-right: 4px

  &.expanded
    >.overlay
      opacity: 0.85

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

      >.link
        margin-right: 24px
</style>