<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from "radix-vue"
import { PopoverRoot, useForwardPropsEmits } from "radix-vue"

const properties = defineProps<PopoverRootProps>()
const emits = defineEmits<PopoverRootEmits>()

const forwarded = useForwardPropsEmits(properties, emits)
</script>

<template>
	<div class="flex">
		<PopoverRoot v-bind="forwarded">
			<slot />
		</PopoverRoot>
	</div>
</template>
