<script setup lang="ts">
import type { FormData } from "~/components/contact-form.vue"

useHead({ title: "vaaski.dev // contact" })

const formState = ref<"initial" | "loading" | "success" | "error">("initial")

const submitForm = async (data: FormData) => {
	try {
		formState.value = "loading"
		const res = await fetch("/.netlify/functions/send-message", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		})
		if (res.status !== 200) throw new Error("something went wrong")
		formState.value = "success"
	} catch {
		formState.value = "error"
	}
}
</script>

<template>
	<main>
		<div class="panel">
			<ClientOnly>
				<HeightTransition>
					<ContactForm v-if="formState === 'initial'" @submit="submitForm" />

					<div v-if="formState === 'loading'">
						<p>loading...</p>
					</div>

					<div v-if="formState === 'success'">
						<p>your message has been sent</p>
						<p>expect a response within 48 hours</p>
						<br />
						<p><AutoLink to="/">go home</AutoLink></p>
					</div>

					<div v-if="formState === 'error'">
						<p>something went wrong</p>
						<p>
							please
							<AutoLink to="https://github.com/vaaski/vaaski.dev/issues/new">
								open an issue on github
							</AutoLink>
						</p>
						<br />
						<p><AutoLink to="/">go home</AutoLink></p>
					</div>
				</HeightTransition>

				<template #fallback>
					<p>
						You don't seem to have JavaScript enabled. Due to abuse, I had to
						disable the captcha-less form on this website.
						<br />
						<br />
						There might be other ways to contact me, you'll figure it out.
					</p>
				</template>
			</ClientOnly>
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

	> * {
		// without this the contact form borders are clipped
		padding: 1px;
	}

	p {
		text-align: center;
	}

	a {
		text-decoration: underline;
	}
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

@media (max-width: 500px) {
	.panel {
		padding: 1rem 1.5rem;
	}
}
</style>
