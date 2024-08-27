<script setup lang="ts">
import type { TransitionProps } from "vue"

const properties = defineProps({
	duration: {
		type: Number,
		default: 500,
	},
})

const transitionCSS = `all ${properties.duration}ms cubic-bezier(0.76, 0, 0.24, 1)`

const transition: TransitionProps = {
	css: false,
	onBeforeEnter: (element) => {
		if (!(element instanceof HTMLElement)) throw new Error("invalid element")
		element.style.height = "0"
		element.style.overflow = "hidden"
		element.style.opacity = "0"
	},
	onEnter: async (element, done) => {
		if (!(element instanceof HTMLElement)) throw new Error("invalid element")
		await nextTick()

		element.style.transition = transitionCSS
		element.style.height = `${element.scrollHeight}px`
		element.style.opacity = "1"
		await wait(properties.duration)
		done()
	},
	onAfterEnter: (element) => {
		if (!(element instanceof HTMLElement)) throw new Error("invalid element")
		element.style.height = ""
		element.style.overflow = ""
		element.style.transition = ""
		element.style.opacity = ""
	},
	onBeforeLeave: (element) => {
		if (!(element instanceof HTMLElement)) throw new Error("invalid element")
		element.style.height = `${element.scrollHeight}px`
		element.style.overflow = "hidden"
		element.style.opacity = "1"
	},
	onLeave: async (element, done) => {
		if (!(element instanceof HTMLElement)) throw new Error("invalid element")
		await nextTick()

		element.style.transition = transitionCSS
		element.style.height = "0"
		element.style.opacity = "0"
		await wait(properties.duration)
		done()
	},
	onAfterLeave: (element) => {
		if (!(element instanceof HTMLElement)) throw new Error("invalid element")
		element.style.height = ""
		element.style.overflow = ""
		element.style.opacity = ""
		element.style.transition = ""
	},
}
</script>

<template>
	<Transition
		@before-enter="transition.onBeforeEnter"
		@enter="transition.onEnter"
		@after-enter="transition.onAfterEnter"
		@before-leave="transition.onBeforeLeave"
		@leave="transition.onLeave"
		@after-leave="transition.onAfterLeave"
	>
		<slot />
	</Transition>
</template>
