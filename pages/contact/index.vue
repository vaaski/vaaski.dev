<script setup lang="ts">
const name = ref("")
const email = ref("")
const message = ref("")
const captchaPayload = ref("")

const router = useRouter()
const formSubmit = async () => {
  try {
    const res = await fetch("/.netlify/functions/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value,
        captcha: captchaPayload.value,
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
  <div class="contact-form">
    <ClientOnly>
      <h1>contact</h1>
      <form @submit.prevent="formSubmit">
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
        <CaptchaWidget v-model:payload="captchaPayload" />
        <button type="submit">send</button>
      </form>

      <template #fallback>
        <div class="fallback">
          You don't seem to have JavaScript enabled. Due to abuse, I had to disable the
          captcha-less form on this website.
          <br />
          <br />
          There might be other ways to contact me, you'll figure it out.
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
form,
.contact-form {
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
button,
altcha-widget {
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
  transition: 200ms ease-in-out;
  &:focus {
    outline: none;
    box-shadow: 0 0 15px hsla(0, 0%, 100%, 0.25);
  }
}

textarea {
  resize: none;
}

.fallback {
  text-align: center;
  font-weight: 300;
}
</style>
