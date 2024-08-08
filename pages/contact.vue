<script setup lang="ts">
const name = ref("")
const email = ref("")
const message = ref("")

const view = ref<"form" | "success" | "error">("form")

const formSubmit = () => {
  console.log({ name, email, message })
  view.value = Math.random() > 0.5 ? "success" : "error"
}
</script>

<template>
  <main>
    <div class="panel">
      <h1>contact</h1>
      <form @submit.prevent="formSubmit" v-if="view === 'form'">
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

      <div v-if="view === 'success'">
        <p>your message has been sent</p>
        <p>expect a response within 48 hours</p>
        <p><AutoLink to="/">go home</AutoLink></p>
      </div>

      <div v-if="view === 'error'">
        <p>something went wrong</p>
        <p>
          perhaps
          <AutoLink to="https://github.com/vaaski/vaaski.dev/issues/new">
            open an issue on github
          </AutoLink>
        </p>
        <p><AutoLink to="/">go home</AutoLink></p>
      </div>
    </div>
    <div class="backdrop"></div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.panel {
  z-index: 4;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 3rem;
  width: 100%;
  max-width: min(600px, 90vw);

  background: radial-gradient(
    157.14% 157.14% at 67.21% -25.11%,
    rgba(255, 255, 255, 0.06) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.125);
  border-radius: 2rem;
}

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

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  z-index: 1;
  opacity: 0.5;

  background: radial-gradient(
      72.09% 111% at -20.75% 100%,
      rgba(127, 0, 255, 0.46) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    radial-gradient(
      84.26% 129.74% at 50% 125.36%,
      rgba(255, 0, 230, 0.46) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    radial-gradient(
      58.7% 90.38% at 113.99% 96.18%,
      rgba(255, 0, 107, 0.43) 0%,
      rgba(0, 0, 0, 0) 100%
    );
}
</style>
