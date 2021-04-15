<script lang="ts">
import { defineComponent, reactive, ref } from "vue"

const messageDest = "/.netlify/functions/message"
const emailReg = /[A-Z0-9._%+-]+@[A-Z0-9-]+.[A-Z]{2,4}/gim

export default defineComponent({
  setup() {
    const form = reactive({
      name: "",
      email: "",
      message: "",
    })

    const valid = reactive({
      name: true,
      email: true,
      message: true,
    })

    const success = ref<boolean | null>(null)

    const submit = async (e?: Event) => {
      e?.preventDefault()

      valid.name = true
      valid.email = true
      valid.message = true
      success.value = null

      if (!form.name) valid.name = false
      if (!form.email || !form.email.match(emailReg)) valid.email = false
      if (!form.message) valid.message = false

      if (!valid.name || !valid.email || !valid.message) return

      try {
        const res = await fetch(messageDest, {
          method: "POST",
          body: JSON.stringify(form),
        })

        if (!res.ok) {
          success.value = false
          return
        }

        form.name = ""
        form.email = ""
        form.message = ""

        success.value = true
      } catch (error) {
        console.error(error)
        success.value = false
      }
    }

    const onkeydown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && e.ctrlKey) {
        e.preventDefault()
        submit()
      }
    }

    return {
      submit,
      onkeydown,
      form,
      valid,
      success,
    }
  },
})
</script>

<template>
  <main class="flex flex-col h-full items-center justify-center">
    <section v-if="success === null" class="max-w-85/100">
      <h1 class="mb-2 text-4xl">contact me</h1>
      <p class="text-white text-opacity-50 -sm:text-sm">
        use the form below to get in touch and i'll respond within 48 hours.
      </p>

      <form :onsubmit="submit" class="flex flex-col mt-5">
        <input
          v-model="form.name"
          @input="valid.name = true"
          type="text"
          name="name"
          placeholder="name"
          autocomplete="name"
          spellcheck="false"
          class="input"
          :class="{ invalid: !valid.name }"
        />
        <input
          v-model="form.email"
          @input="valid.email = true"
          type="text"
          name="email"
          placeholder="email"
          autocomplete="email"
          spellcheck="false"
          class="input"
          :class="{ invalid: !valid.email }"
        />
        <textarea
          v-model="form.message"
          @input="valid.message = true"
          name="message"
          placeholder="message"
          @keydown="onkeydown"
          maxlength="1500"
          autocomplete="off"
          class="min-h-25 input"
          style="resize: none"
          :class="{ invalid: !valid.message }"
        />

        <button type="submit" class="button">submit</button>
      </form>
    </section>

    <section v-if="success === false">
      <h1 class="text-clr-accent-pink mb-2 text-3xl">hmm, looks like something went wrong.</h1>
      <p class="text-white text-opacity-75">
        please send me
        <a href="mailto:admin@vaa.ski" target="_blank" class="animate-underline link"
          >an email</a
        >
        instead or <router-link to="/" class="animate-underline link">return home</router-link>
      </p>
    </section>

    <section v-if="success === true">
      <h1 class="mb-2 text-3xl">message sent.</h1>
      <p class="text-white text-opacity-75">
        i will most likely respond within 48 hours. you can go
        <router-link to="/" class="animate-underline link">back home</router-link> now.
      </p>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.input {
  @apply bg-clr-dark rounded;
  @apply my-2 py-2 px-3;
  @apply min-w-75;
  @apply outline-none focus:outline-none;
  @apply transition-all hover:(ring-1 ring-clr-accent-blue) focus:(ring-1 ring-clr-accent-blue);

  &.invalid {
    @apply ring-2 ring-clr-accent-pink;
  }
}

.button {
  @apply bg-clr-dark rounded mt-2 py-3 outline-none focus:outline-none;
  @apply transition-all hover:(ring-1 ring-clr-accent-blue);
}
</style>