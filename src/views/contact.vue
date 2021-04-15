<script lang="ts">
import { defineComponent, reactive } from "vue"

export default defineComponent({
  setup() {
    const form = reactive({
      name: "",
      email: "",
      message: "",
    })

    const submit = async (e?: Event) => {
      e?.preventDefault()

      try {
        await fetch("http://localhost:19516/.netlify/functions/message", {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(form),
        })

        form.name = ""
        form.email = ""
        form.message = ""
        // TODO show success message and go back home
      } catch (error) {}
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
    }
  },
})
</script>

<template>
  <main>
    <h1>contact</h1>
    <form action="http://localhost:19516/message" :onsubmit="submit">
      <input v-model="form.name" type="text" name="name" placeholder="name" />
      <input v-model="form.email" type="text" name="email" placeholder="email" />
      <textarea
        v-model="form.message"
        name="message"
        placeholder="message"
        @keydown="onkeydown"
      />

      <button type="submit">submit</button>
    </form>
  </main>
</template>
