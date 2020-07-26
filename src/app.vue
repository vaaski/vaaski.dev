<template>
  <div id="app">
    <rain />
    <div id="content">
      <!-- <nav id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/">Home</router-link>
        <router-link to="/">Home</router-link>
        <router-link to="/">Home</router-link>
        <router-link to="/">Home</router-link>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </nav> -->
      <router-view class="route" />
    </div>
  </div>
</template>

<script>
const rain = require("./components/rain").default

export default {
  name: "app",
  components: { rain },
}
</script>

<style lang="stylus">
html, body
  margin: 0
  padding: 0
  height: 100%
  width: 100%
  font-family: "Sora", sans-serif
  font-weight: 200
  background: #19182d
  color: #dcdce0

#app
  height: 100%
  width: 100%
  background: linear-gradient(30deg, #19182d 0, #0c0c14 100%)
  color: #dcdce0

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

    #nav
      position: absolute
      z-index: 3
</style>
