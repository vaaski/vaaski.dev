<template>
  <div id="home">
    <div class="box">
      <logo color="rgba(255, 255, 255, 0.85)" />
    </div>
  </div>
</template>

<script>
const logo = require("../components/logo").default
export default {
  name: "home",
  components: { logo },
}
</script>

<style lang="stylus">
#home
  height: 100%
  width: 100%
  display: flex
  justify-content: center
  align-items: center

  .box
    width: 700px
    max-width: calc(20vw + 15vh)
    // padding: 32px 48px
    padding: 128px 64px;
    border-radius: 50%//15px
    backdrop-filter: blur(2px)
</style>