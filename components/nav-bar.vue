<script setup lang="ts">
import type {
	RouteLocationAsPathGeneric,
	RouteLocationAsRelativeGeneric,
} from "vue-router"

import Hamburger from "@/assets/icons/hamburger.vue"

import { Popover, PopoverContent } from "@/components/ui/popover"

const hamburgerOpen = ref(false)

type Link = {
	name: string
	to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
}
const links: Link[] = [
	{ name: "projects", to: { path: "/", hash: "#projects" } },
	{ name: "contact", to: "/contact" },
	{ name: "github", to: "https://github.com/vaaski" },
]

const route = useRoute()
const router = useRouter()
const wordmarkClick = async () => {
	if (route.path !== "/") await router.push("/")

	const scrollListener = () => {
		if (window.scrollY === 0) {
			window.removeEventListener("scroll", scrollListener)
			if (window.location.hash) window.location.hash = ""
		}
	}
	window.addEventListener("scroll", scrollListener)

	window.scrollTo({ top: 0, behavior: "smooth" })
}
</script>

<template>
	<div id="nav-bar">
		<div class="left">
			<ClientOnly>
				<NuxtLink class="wordmark" @click.native="wordmarkClick">vaaski.dev</NuxtLink>

				<template #fallback>
					<NuxtLink class="wordmark" to="/">vaaski.dev</NuxtLink>
				</template>
			</ClientOnly>
		</div>
		<div class="spacer"></div>
		<div class="right">
			<AutoLink v-for="link in links" :key="link.name" :to="link.to">{{
				link.name
			}}</AutoLink>
		</div>
		<div class="hamburger">
			<Popover :open="hamburgerOpen" @update:open="hamburgerOpen = $event">
				<PopoverTrigger>
					<Hamburger />
				</PopoverTrigger>
				<PopoverContent align="end">
					<div class="popover-links">
						<AutoLink
							v-for="link in links"
							:key="link.name"
							@click="hamburgerOpen = false"
							:to="link.to"
						>
							{{ link.name }}
						</AutoLink>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	</div>
</template>

<style scoped lang="scss">
#nav-bar {
	display: flex;
	z-index: 5;
	padding: 1.25rem 0;
	margin-top: 1rem;
	width: 100%;
	max-width: min(750px, 90vw);
	backdrop-filter: blur(5px);

	background: linear-gradient(
		216.04deg,
		rgba(255, 255, 255, 0.06) 18.89%,
		rgba(255, 255, 255, 0.012) 87.3%
	);
	box-shadow: 0px -1px 2px rgba(255, 255, 255, 0.25);
	border-radius: 100px;

	.spacer {
		flex-grow: 1;
	}
}

.left,
.right {
	display: flex;
	gap: 1.2rem;
	margin: 0 2rem;

	a {
		--background-x-pad: 0.55em;
		--background-y-pad: 0.2em;

		font-style: normal;
		font-weight: 400;
		font-size: 1.1rem;
		color: hsla(0, 0%, 100%, 0.5);
		text-shadow: 0 0 20px hsla(0, 0%, 0%, 1);
		padding: var(--background-y-pad) var(--background-x-pad);
		margin: calc(var(--background-y-pad) * -1) calc(var(--background-x-pad) * -1);
		border-radius: 1em;
		transition: 75ms linear;
		transition-property: color, background, text-shadow, box-shadow;

		&:not(.wordmark):where(:hover, :focus),
		&.wordmark:where(:focus) {
			color: hsla(0, 0%, 100%, 1);
			text-shadow: 0 0 15px hsla(0, 0%, 100%, 0.5);
		}
	}
}

.hamburger {
	display: none;
	margin: 0 2rem;
	color: hsla(0, 0%, 100%, 0.5);
}

@media (max-width: 500px) {
	.right {
		display: none;
	}

	.hamburger {
		display: flex;
	}
}

.popover-links {
	display: flex;
	flex-direction: column;

	a {
		color: hsla(0, 0%, 100%, 0.75);
		margin: 0.5rem 0;
	}
}
</style>
