<script setup lang="ts">
const formData = reactive({
	name: "",
	email: "",
	message: "",
	captcha: "",
})

export type FormData = typeof formData
const emit = defineEmits<(event: "submit", data: FormData) => void>()

const submitted = ref(false)

const formSubmit = async () => {
	if (submitted.value) return
	submitted.value = true

	emit("submit", formData)
}
</script>

<template>
	<div class="contact-form">
		<h1>contact</h1>
		<form @submit.prevent="formSubmit">
			<input
				v-model="formData.name"
				placeholder="name"
				type="text"
				name="name"
				required
				autocomplete="given-name"
			/>
			<input
				v-model="formData.email"
				placeholder="email"
				type="email"
				name="email"
				required
				autocomplete="email"
			/>
			<textarea
				v-model="formData.message"
				placeholder="message"
				name="message"
				required
			/>
			<CaptchaWidget v-model:payload="formData.captcha" />
			<button type="submit">send</button>
		</form>
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
