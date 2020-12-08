<template>
  <main class="countdown">
    <transition-text :input="text" :prefix="prefix" :suffix="suffix"></transition-text>
  </main>
</template>

<script>
import TransitionText from "../components/transition-text.vue"

const { calcDuration, timeDown, formatDuration } = require("../assets/countdown")

export default {
  name: "countdown",
  components: { TransitionText },
  data: () => ({
    text: "",
    name: "",
    prefix: "",
    suffix: "",
    interval: 0,
    to: 0,
  }),
  created() {
    this.interval = setInterval(this.tick, 100)
    this.init(this.$route.params)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
    if (process.env.NODE_ENV === "development") window.countdown = this
  },
  beforeRouteUpdate(to, from, next) {
    this.init(to.params)
    next()
  },
  methods: {
    init(params) {
      this.to = Number(params.to) * 1000 || 0
      this.name = params.name || ""
      if (this.name)
        document.title = `${document.location.host} // ${this.name} ${this.$route.name}`
    },
    tick() {
      if (document.hidden) return

      let time = this.to
      time = calcDuration(time - Date.now())
      const past = time.past
      time = timeDown(time)
      time = formatDuration(time, 1, " ")

      this.prefix = this.name ? `${this.name} ${past ? "was " : "is "}` : ""
      this.prefix += past ? "" : "in "
      this.suffix = past ? " ago" : ""
      this.text = time
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "../assets/globals"

main.countdown
  display: flex
  justify-content: center
  align-items: center

  .transition-text
    font-size: 3vw

    @media screen and (max-width: $mobile-break)
      font-size: 5vw
</style>