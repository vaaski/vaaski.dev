<template>
  <main class="bookmarklet">
    <section class="before">
      <textarea
        v-model="input"
        class="input"
        name="before"
        placeholder="paste your code here"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        autofocus
        ref="input"
      ></textarea>
    </section>
    <section class="settings">
      <div class="setting" v-for="(val, key) in conf" :key="key">
        <input type="checkbox" :name="key" :id="key" v-model="conf[key]" />
        <label :for="key" :title="getConfDesc(key, 'title')">{{ getConfDesc(key, 'label') }}</label>
      </div>
      <!-- <div class="setting">
        <input type="checkbox" name="iife" id="iife" v-model="conf.iife" />
        <label for="iife" title="wrap into Immediately invoked function expression">wrap in IIFE</label>
      </div>
      <div class="setting">
        <input type="checkbox" name="bookmarklet" id="bookmarklet" v-model="conf.bookmarklet" />
        <label
          for="bookmarklet"
          title="urlEncode and prefix with javascript:"
        >convert to bookmarklet</label>
      </div>-->
    </section>
    <section class="after">
      <textarea
        v-model="output"
        class="output"
        readonly
        name="after"
        placeholder="output"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        :class="{ error }"
      ></textarea>
    </section>
    <section class="lower">
      <div class="copy">
        <button class="copy" @click="copy(output)">{{ copyText }}</button>
      </div>
      <div class="bookmark" v-if="conf.bookmarklet">
        <label
          @click="bookmarkClick"
          for="bookmark"
        >bookmark:{{bookmarkName === "bookmarklet" ? " (click to rename)" : ""}}</label>
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
          :style="{ width: `${bookmarkName.length}ch`}"
        />
        <a
          v-else
          @click="bookmarkClick"
          id="bookmark"
          :href="error || output === '' ? '/' : output"
          :tabindex="focusindex + 1"
        >{{ bookmarkName }}</a>
      </div>
    </section>
  </main>
</template>

<script>
let _minify

const { wait, copyToClipboard, debounce, ls, bytesize } = require("../assets/utils")
window.bytesize = bytesize

export default {
  name: "minify",
  data: () => ({
    conf: { iife: true, bookmarklet: true, minify: true, env: false },
    confDesc: {
      iife: {
        title:
          "wrap into immediately invoked function expression, disable it to make declared variables unavailable to parent context",
        label: "IIFE",
      },
      bookmarklet: {
        title: "url encode and prefix with 'javascript:'",
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
    input: "",
    output: "",
    error: false,
    copyText: "copy to clipboard",
    bookmarkName: "bookmarklet",
  }),
  props: {
    focusindex: {
      type: Number,
      default: 10,
    },
  },
  async mounted() {
    await this.$nextTick()
    this.$refs.input.focus()
    this.loadState()
  },
  watch: {
    input: debounce(function () {
      this.transform()
    }, 100),
    conf: {
      handler() {
        this.transform()
      },
      deep: true,
    },
  },
  methods: {
    getConfDesc(key, val) {
      return this.confDesc[key] ? this.confDesc[key][val] || "" : ""
    },
    async importMinify() {
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
    saveState() {
      const { conf, input } = this
      ls("vaaski.dev-minify-conf", conf)
      ls("vaaski.dev-minify-input", input)
    },
    loadState() {
      const conf = ls("vaaski.dev-minify-conf", conf)
      if (conf) this.conf = conf

      const input = ls("vaaski.dev-minify-input", input)
      if (input) this.input = input
    },
    async transform() {
      let out = this.input
      this.saveState()

      if (out === "") return (this.output = "")
      this.output = "loading..."
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
    height: 20vh
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

    textarea
      $padding = 15px
      height: "calc(100% - 2*%s - 2px)" % $padding
      width: "calc(100% - 2*%s - 2px)" % $padding
      padding: $padding

      &.error
        border-color: $error !important
        color: $error !important
</style>