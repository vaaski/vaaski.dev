<script setup lang="ts">
import { useRouter } from "nuxt/app"
import { ref } from "vue"

const name = ref("")
const email = ref("")
const message = ref("")

const router = useRouter()
const formSubmit = async () => {
  try {
    const res = await fetch("/.netlify/functions/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    })
    if (res.status !== 200) throw new Error("something went wrong")
    await router.push("/contact/success")
  } catch {
    await router.push("/contact/error")
  }
}
</script>

<template>
  <h1>contact</h1>
  <form
    @submit.prevent="formSubmit"
    action="/.netlify/functions/sendMessageNative"
    method="post"
  >
    <input
      v-model="name"
      placeholder="name"
      type="text"
      name="name"
      required
      autocomplete="given-name"
    />
    <input
      v-model="email"
      placeholder="email"
      type="email"
      name="email"
      required
      autocomplete="email"
    />
    <textarea v-model="message" placeholder="message" name="message" required />
    <button type="submit">send</button>
  </form>
</template>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h1 {
  text-align: center;
  font-size: 1.75rem;
  font-weight: 300;
  text-shadow: 0 0 15px hsla(0, 0%, 100%, 0.5);
}

p {
  text-align: center;
}

a {
  text-decoration: underline;
}

input,
textarea,
button {
  background: transparent;
  padding: 0.5em 1em;
  box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.125);
  border-radius: 1.333em;
  flex-grow: 1;
  font-size: 1.25rem;

  &::placeholder {
    color: hsla(0, 0%, 100%, 0.25);
  }
}

input,
textarea {
  &:focus {
    outline: none;
    box-shadow: 0 0 15px hsla(0, 0%, 100%, 0.25);
  }
}

textarea {
  resize: none;
}
</style>
