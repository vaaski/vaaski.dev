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
  data: () => ({
    navigation: [
      {
        text: "home",
        to: "/",
      },
      {
        text: "github",
        to: "https://github.com/vaaski",
      },
      {
        text: "w2g",
        to: "https://github.com/vaaski/w2g",
      },
    ],
  }),
}
</script>

<style lang="stylus">
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;200;300&display=swap")

$bezier = cubic-bezier(0.76, 0, 0.24, 1)

html, body
  margin: 0
  padding: 0
  height: 100%
  width: 100%
  font-family: "IBM Plex Sans", sans-serif
  font-weight: 200
  background: linear-gradient(30deg, #19182d 0, #0c0c14 100%)
  background-size: cover
  color: #dcdce0
  -webkit-tap-highlight-color: transparent
  -webkit-overflow-scrolling: touch
  overflow: hidden
  position: fixed
  overscroll-behavior-y: none

:root
  --clr-text: #dcdce0
  --clr-background: #131221
  --grd-background: linear-gradient(30deg, #19182d 0, #0c0c14 100%)

#app
  height: 100%
  width: 100%
  overflow-y: auto
  position: fixed
  top: 0
  overscroll-behavior-y: none

  a
    color: inherit

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
      width: 100%
      max-width: 500px
      right: 0
</style>
