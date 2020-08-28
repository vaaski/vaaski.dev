<template>
  <main id="home">
    <div class="box">
      <logo color="rgba(255, 255, 255, 0.85)" />
    </div>
  </main>
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
    width: calc(20vw + 15vh)
    max-width: 400px
    padding: 64px
    border-radius: 50%
</style>