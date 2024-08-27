<script setup lang="ts">
import { cn } from "@/lib/utils"
import {
	PopoverContent,
	type PopoverContentEmits,
	type PopoverContentProps,
	PopoverPortal,
	useForwardPropsEmits,
} from "radix-vue"
import { type HTMLAttributes, computed } from "vue"

defineOptions({
	inheritAttrs: false,
})

const props = withDefaults(
	defineProps<PopoverContentProps & { class?: HTMLAttributes["class"] }>(),
	{
		align: "center",
		sideOffset: 4,
		class: "",
	},
)
const emits = defineEmits<PopoverContentEmits>()

const delegatedProperties = computed(() => {
	const { class: _, ...delegated } = props

	return delegated
})

const forwarded = useForwardPropsEmits(delegatedProperties, emits)
</script>

<template>
	<PopoverPortal>
		<PopoverContent
			v-bind="{ ...forwarded, ...$attrs }"
			:class="
				cn(
					'z-50 bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
					props.class,
					'popover-content',
				)
			"
		>
			<slot />
		</PopoverContent>
	</PopoverPortal>
</template>

<style>
.popover-content {
	background: hsla(0, 0%, 100%, 0.05);
	background: linear-gradient(
			216.04deg,
			rgba(255, 255, 255, 0.06) 18.89%,
			rgba(255, 255, 255, 0.012) 87.3%
		),
		hsla(0, 0%, 0%, 0.25);
	box-shadow: 0px -1px 0 rgba(255, 255, 255, 0.25);
	backdrop-filter: blur(5px);
	padding: 0.5rem 2rem;
	border-radius: 5px;
}
</style>
