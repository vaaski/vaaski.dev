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
  <main class="flex flex-col h-full full items-center justify-center">
    <TransitionGroup name="fade">
      <section v-if="success === null" class="max-w-85/100">
        <h1 class="mb-2 text-4xl">contact me</h1>
        <p class="opacity-50 -sm:text-sm">
          use the form below to get in touch and i'll respond within 48 hours.
        </p>

        <form :onsubmit="submit" class="flex flex-col mt-5">
          <input
            v-model="form.name"
            type="text"
            name="name"
            placeholder="name"
            autocomplete="name"
            spellcheck="false"
            class="input"
            :class="{ invalid: !valid.name }"
            @input="valid.name = true"
          />
          <input
            v-model="form.email"
            type="text"
            name="email"
            placeholder="email"
            autocomplete="email"
            spellcheck="false"
            class="input"
            :class="{ invalid: !valid.email }"
            @input="valid.email = true"
          />
          <textarea
            v-model="form.message"
            name="message"
            placeholder="message"
            :maxlength="1500"
            autocomplete="off"
            class="min-h-25 input"
            style="resize: none"
            :class="{ invalid: !valid.message }"
            @input="valid.message = true"
            @keydown="onkeydown"
          />

          <button type="submit" class="button">submit</button>
        </form>
      </section>

      <section v-if="success === false">
        <h1 class="text-clr-accent-pink mb-2 text-3xl">
          hmm, looks like something went wrong.
        </h1>
        <p class="text-clr-white opacity-75">
          please send me
          <a href="mailto:admin@vaa.ski" target="_blank" class="animate-underline link"
            >an email</a
          >
          instead or
          <RouterLink to="/" class="animate-underline link">return home</RouterLink>
        </p>
      </section>

      <section v-if="success === true">
        <h1 class="mb-2 text-3xl">message sent.</h1>
        <p class="text-clr-white opacity-75">
          i will most likely respond within 48 hours. you can go
          <RouterLink to="/" class="animate-underline link">back home</RouterLink> now.
        </p>
      </section>
    </TransitionGroup>
  </main>
</template>

<style lang="scss" scoped>
section {
  padding: 2rem 3.5rem;
  border-radius: 25px;
  background: linear-gradient(-45deg, rgba(0, 0, 0, 0.125), transparent);
  box-shadow: 0 0 45px rgba(0, 0, 0, 0.125);
  backdrop-filter: blur(10px);

  @media (max-width: 640px) {
    padding: 2rem;
  }

  // @media (prefers-color-scheme: light) {
  //   color: white;
  //   background: transparent;
  //   box-shadow: 0 0 25px rgba(255, 255, 255, 0.1);
  //   box-shadow: none;
  // }
}

// todo: refactor all these colors into theme colors
.input {
  @apply rounded;
  @apply my-2 py-2 px-3;
  @apply outline-none focus:outline-none;

  background: rgba(0, 0, 0, 0.075);
  transition: 250ms cubic-bezier(0.76, 0, 0.24, 1);
  box-shadow: 0 0 0 rgba(255, 255, 255, 0.05);

  &:hover {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.05);
  }

  &:focus,
  &:hover:focus {
    transition: 500ms cubic-bezier(0.76, 0, 0.24, 1);
    box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.5);
  }

  // @media (prefers-color-scheme: light) {
  //   color: white;
  //   background: transparent;
  //   box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.125);

  //   &::placeholder {
  //     color: rgba(255, 255, 255, 0.25);
  //   }

  //   &:hover {
  //     box-shadow: 0 0 15px rgba(255, 255, 255, 0.125);
  //   }
  // }

  &.invalid {
    box-shadow: 0 0 3px 1px var(--clr-accent-pink);

    &:hover {
      box-shadow: 0 0 15px var(--clr-accent-pink);
    }

    &:focus,
    &:hover:focus {
      transition: 500ms cubic-bezier(0.76, 0, 0.24, 1);
      box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.5);
    }
  }
}

.button {
  @apply rounded outline-none mt-2 py-3 focus:outline-none;

  background: rgba(0, 0, 0, 0.075);
  transition-delay: 0;
  transition: 250ms cubic-bezier(0.76, 0, 0.24, 1);

  &:hover {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.05);
  }

  &:active,
  &:hover:active {
    transition: 100ms cubic-bezier(0.76, 0, 0.24, 1);
    box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.5);
  }

  // @media (prefers-color-scheme: light) {
  //   background: rgba(255, 255, 255, 0.025);
  //   color: white;

  //   &:hover {
  //     box-shadow: 0 0 15px rgba(255, 255, 255, 0.25);
  //   }
  // }
}
</style>
