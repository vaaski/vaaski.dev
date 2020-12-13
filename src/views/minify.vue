<template>
  <main class="bookmarklet">
    <section class="before" v-if="!(input === '' && output !== '')">
      <codearea
        v-model="input"
        class="input"
        name="input"
        placeholder="paste your code here"
        autofocus
        ref="input"
        clearable
      />
    </section>
    <section class="settings" v-if="!(input === '' && output !== '')">
      <div class="setting" v-for="(val, key) in conf" :key="key">
        <input type="checkbox" :name="key" :id="key" v-model="conf[key]" />
        <label :for="key" :title="getConfDesc(key, 'title')">{{
          getConfDesc(key, "label")
        }}</label>
      </div>
    </section>
    <section class="after">
      <codearea
        v-model="output"
        class="output"
        placeholder="output"
        name="output"
        :class="{ error }"
        readonly
        :clearable="input === '' && output !== ''"
      />
    </section>
    <section class="lower">
      <div class="copy">
        <button class="copy" @click="copy(output)">{{ copyText }}</button>
      </div>
      <div class="bookmark" v-if="conf.bookmarklet">
        <label @click="bookmarkClick" for="bookmark"
          >bookmark:{{
            bookmarkName === "bookmarklet" ? " (click to rename)" : ""
          }}</label
        >
        <input
          v-if="editBookmarkName"
          type="text"
          name="bookmark name"
          id="bookmark"
          v-model="bookmarkName"
          ref="bookmarkInput"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          @keydown.enter="editBookmarkName = false"
          @keydown.esc="editBookmarkName = false"
          @blur="editBookmarkName = false"
          :style="{ width: `${bookmarkName.length}ch` }"
        />
        <a
          v-else
          @click="bookmarkClick"
          @click.right.prevent="bookmarkClick"
          id="bookmark"
          :href="error || output === '' ? '/' : output"
          tabindex="0"
          >{{ bookmarkName }}</a
        >
      </div>
    </section>
  </main>
</template>

<script>
// cspell:words uncrushed uncrush
let _minify

import codearea from "../components/codearea"

const { wait, copyToClipboard, debounce, ls } = require("../assets/utils")
const { JSONCrush, JSONUncrush } = require("../assets/JSONCrush.js")

export default {
  name: "minify",
  components: { codearea },
  data: () => ({
    conf: { iife: true, bookmarklet: false, minify: true, env: false },
    shareConf: {
      bookmarkName: true,
      input: false,
    },
    confDesc: {
      iife: {
        title:
          "wrap into immediately invoked function expression, disable it to make declared variables unavailable to parent context",
        label: "IIFE",
      },
      bookmarklet: {
        title: "url encode and convert to bookmarklet format",
        label: "bookmarklet",
      },
      minify: {
        title: "minify code using babel-preset-minify",
        label: "minify",
      },
      env: {
        title:
          "transpile code to make it compatible with older browsers using @babel/preset-env with '> 0.25%, not dead'",
        label: "babel transpile",
      },
    },
    editBookmarkName: false,
    bookmarkName: "bookmarklet",
    input: "",
    output: "",
    error: false,
    copyText: "copy to clipboard",
    disableConfigSave: false,
  }),
  async mounted() {
    if (process.env.NODE_ENV === "development") window.minify = this
    window.onhashchange = this.applyHashConfig
    window.getSharableUrl = this.getSharableUrl

    await this.$nextTick()
    this.$refs.input.$el.focus()
    this.$refs.input.$el.selectionEnd = 0
    this.loadState()
    this.applyHashConfig()

    await wait(500)
    if (!_minify) _minify = await this.importMinify()
  },
  beforeDestroy() {
    window.onhashchange = null
  },
  watch: {
    input: debounce(function () {
      this.transform()
    }, 100),
    conf: {
      handler() {
        if (this.disableConfigSave) return

        this.transform()
      },
      deep: true,
    },
  },
  methods: {
    getSharableUrl(conf) {
      const out = {}
      const { bookmarkName, input } = { ...this.shareConf, ...conf }

      if (bookmarkName && this.conf.bookmarklet) out.bookmarkName = this.bookmarkName
      if (input) out.input = this.input
      else out.output = this.output

      const encodedOut = JSON.stringify(out)
      const crushed = JSONCrush(encodedOut)
      const url = new URL(location)
      url.hash = crushed

      this.disableConfigSave = false
      this.saveState()

      return url
    },
    uncrushHash({ hash }) {
      const decoded = decodeURIComponent(hash.slice(1))
      try {
        const uncrushed = JSONUncrush(decoded)
        if (!uncrushed.length) return false
        const parsed = JSON.parse(uncrushed)

        return parsed
      } catch (error) {
        this.log("hash parsing error", error)
        return false
      }
    },
    async applyHashConfig() {
      this.log("applyHashConfig")
      const urlConf = this.uncrushHash(this.$route)
      if (urlConf) {
        this.disableConfigSave = true
        if (urlConf.bookmarkName) {
          this.conf.bookmarklet = true
          this.bookmarkName = urlConf.bookmarkName
        }
        if (urlConf.input) {
          this.input = urlConf.input
          await this.$nextTick()
          this.$refs.input.$el.selectionEnd = 0 // todo this doesn't work
        } else if (urlConf.output) this.output = urlConf.output

        window.location.hash = ""
      } else this.disableConfigSave = false
    },
    saveState() {
      if (this.disableConfigSave) return this.log("didn't save config")
      const { conf, input } = this
      ls("vaaski.dev-minify-conf", conf)
      ls("vaaski.dev-minify-input", input)
    },
    loadState() {
      const conf = ls("vaaski.dev-minify-conf", conf)
      if (conf) this.conf = conf

      const input = ls("vaaski.dev-minify-input", input)
      if (input) this.input = input
      else this.input = ""
    },
    getConfDesc(key, val) {
      return this.confDesc[key] ? this.confDesc[key][val] || "" : ""
    },
    async importMinify() {
      console.log("loading minify.js")
      const { default: _minify } = await import(
        /* webpackChunkName: "minifyChunk" */ "../assets/min"
      )
      return _minify
    },
    async minify(code) {
      if (!_minify) _minify = await this.importMinify()

      const { minify, env, iife } = this.conf
      const res = await _minify(code, { minify, env, iife })
      return res
    },
    async copy(str) {
      const text = this.copyText
      try {
        copyToClipboard(str)
        this.copyText = "copied"
        await wait(2e3)
        this.copyText = text
      } catch (err) {
        this.copyText = "could not copy"
        await wait(2e3)
        this.copyText = text
      }
    },
    async bookmarkClick(e) {
      e.preventDefault()
      this.editBookmarkName = !this.editBookmarkName
      if (this.editBookmarkName) {
        await this.$nextTick()
        this.$refs.bookmarkInput.select()
      }
    },
    async transform() {
      let out = this.input
      this.saveState()
      this.log("transform")

      if (out === "") return (this.output = "")
      try {
        out = await this.minify(out)
        this.error = false
        if (this.conf.bookmarklet) out = `javascript:${encodeURIComponent(out)}`
        this.output = out
      } catch (error) {
        this.error = error
        this.output = error.message
      }
    },
  },
}
</script>

<style lang="stylus">
@import "../assets/globals"

.bookmarklet
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column

  section
    width: 75%
    max-width: 75vw
    height: 25vh
    display: flex
    justify-content: center
    align-items: center

    @media screen and (max-width: $mobile-break)
      width: 85%
      max-width: 85vw

    label
      margin: 0 0.5ch
      cursor: pointer

    &.settings, &.lower
      margin: 1em 0
      height: unset

      @media screen and (max-width: $mobile-break)
        flex-direction: column
        margin: 0.5em 0

        >div
          display: flex
          justify-content: center
          align-items: center
          margin: 0.5ch 0

      >div
        padding: 0 1em

    &.lower
      margin-bottom: 0

      a
        cursor: pointer
        padding: 0.5ch 1ch

      input
        font-size: 1em
        padding: 0.5ch 1ch

    .codearea
      height: 100%
      width: 100%

      &.error textarea
        border-color: $error !important
        color: $error !important
</style>