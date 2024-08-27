<script setup lang="ts">
import type { TransitionProps } from "vue"

const props = defineProps({
	duration: {
		type: Number,
		default: 500,
	},
})

const transitionCSS = `all ${props.duration}ms cubic-bezier(0.76, 0, 0.24, 1)`

const transition: TransitionProps = {
	css: false,
	onBeforeEnter: (el) => {
		if (!(el instanceof HTMLElement)) throw new Error("invalid element")
		el.style.height = "0"
		el.style.overflow = "hidden"
		el.style.opacity = "0"
	},
	onEnter: async (el, done) => {
		if (!(el instanceof HTMLElement)) throw new Error("invalid element")
		await nextTick()

		el.style.transition = transitionCSS
		el.style.height = `${el.scrollHeight}px`
		el.style.opacity = "1"
		await wait(props.duration)
		done()
	},
	onAfterEnter: (el) => {
		if (!(el instanceof HTMLElement)) throw new Error("invalid element")
		el.style.height = ""
		el.style.overflow = ""
		el.style.transition = ""
		el.style.opacity = ""
	},
	onBeforeLeave: (el) => {
		if (!(el instanceof HTMLElement)) throw new Error("invalid element")
		el.style.height = `${el.scrollHeight}px`
		el.style.overflow = "hidden"
		el.style.opacity = "1"
	},
	onLeave: async (el, done) => {
		if (!(el instanceof HTMLElement)) throw new Error("invalid element")
		await nextTick()

		el.style.transition = transitionCSS
		el.style.height = "0"
		el.style.opacity = "0"
		await wait(props.duration)
		done()
	},
	onAfterLeave: (el) => {
		if (!(el instanceof HTMLElement)) throw new Error("invalid element")
		el.style.height = ""
		el.style.overflow = ""
		el.style.opacity = ""
		el.style.transition = ""
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
		<slot></slot>
	</Transition>
</template>
