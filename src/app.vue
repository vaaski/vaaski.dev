<template>
  <div id="app">
    <rain />
    <div id="content">
      <navbar :navigation="navigation" />
      <router-view class="route" />
    </div>
  </div>
</template>

<script>
const rain = require("./components/rain").default
const navbar = require("./components/navbar").default

export default {
  name: "app",
  components: { rain, navbar },
  mounted() {
    if (process.env.NODE_ENV === "development") window.vue = this
    this.updateTitle()
    this.$router.afterEach(this.updateTitle)
  },
  methods: {
    updateTitle() {
      document.title = `${document.location.host} // ${this.$route.name}`
    },
  },
  data: () => ({
    navigation: [
      {
        text: "home",
        to: "/",
        title: "home",
      },
      {
        text: "minify/bookmarklet",
        to: "/minify",
        title: "minify and convert to bookmarklet format",
      },
      {
        hr: true,
      },
      {
        text: "github",
        to: "https://github.com/vaaski",
        title: "open source software",
      },
      {
        text: "w2g",
        to: "https://github.com/vaaski/w2g",
        title: "watch youtube videos with your friends",
      },
    ],
  }),
}
</script>

<style lang="stylus">
@import "./assets/globals"
@import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap")

$bezier = cubic-bezier(0.76, 0, 0.24, 1)

html, body
  margin: 0
  padding: 0
  height: 100%
  width: 100%
  font-family: "Fira Code", monospace
  font-weight: 200
  background: linear-gradient(30deg, #19182d 0, #0c0c14 100%)
  background-size: cover
  color: $fg
  -webkit-tap-highlight-color: transparent
  -webkit-overflow-scrolling: touch
  overflow: hidden
  position: fixed
  overscroll-behavior-y: none

:root
  --clr-text: $fg
  --clr-background: #131221
  --grd-background: linear-gradient(30deg, #19182d 0, #0c0c14 100%)

#app
  height: 100%
  width: 100%
  overflow-y: auto
  position: fixed
  top: 0
  overscroll-behavior-y: none
  user-select: none

  a
    color: inherit

  button
    background: transparent
    border: 1px solid $fg
    color: $fg
    font-family: "Fira Code", monospace
    font-size: 1em
    padding: 0.5ch 1ch
    border-radius: $border-radius
    outline: none
    cursor: pointer
    transition: 100ms
    transition-delay: 250ms

    &:active
      background: rgba(255, 255, 255, 0.1)
      transition-delay: 0s

  textarea, input
    background: rgba(255, 255, 255, 0.05)
    border-radius: $border-radius-large
    outline: none
    color: $fg
    scrollbars(0, transparent, transparent)
    font-family: "Fira Code", monospace
    resize: none
    border: 1px solid $fg
    outline: none
    backdrop-filter: blur(2px)
    transition: background 100ms, color 100ms, border 100ms

    &:focus:not([readonly])
      border: 1px solid $focus

    &[readonly]
      border: 1px solid $disabled

  input
    border-radius: $border-radius
    border: none

  ::selection
    background: #cfcdff
    color: #1c1a35

  .rain
    position: fixed
    top: 0
    left: 0
    z-index: 1

  #content
    z-index: 2
    position: fixed
    height: 100%
    width: 100%

    >.route
      position: absolute
      height: 100%
      width: 100%

    >nav
      position: absolute
      z-index: 3
      height: 100%
      max-width: 500px
      right: 0
</style>
