<script setup lang="ts">
const { copy } = useClipboard()

const copySvg = async () => {
	const svg = document.querySelector<SVGElement>("#static-svg-hero")
	if (!svg) throw new Error("svg is not defined")

	let svgString = svg.outerHTML
	console.log(svgString.length)

	svgString = svgString.replaceAll(/\s?data-[^=]*="[^"]*"/g, "")
	console.log(svgString.length)

	svgString = svgString.replaceAll("background-clip", "b")
	console.log(svgString.length)

	svgString = svgString.replaceAll(/<!--.+?-->/g, "")
	console.log(svgString.length)

	copy(svgString)

	svg.outerHTML = svgString
}
</script>

<template>
	<main>
		<SvgHero id="static-svg-hero" />
		<ClientOnly>
			<button @click="copySvg">minify & copy svg</button>
		</ClientOnly>
	</main>
</template>

<style scoped lang="scss">
main {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: #0d1117;

	:global(#static-svg-hero) {
		max-width: 100%;
		height: auto;
	}

	@media (prefers-color-scheme: light) {
		background: #fff;
	}
}
</style>
