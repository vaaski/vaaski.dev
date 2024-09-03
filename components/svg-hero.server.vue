<script setup lang="ts">
const stages = [
	"M 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 0.5 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 Z",
	"M96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186 .5 0 43.9409 0 96.0379 101.889 96.0379 101.889 96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186Z",
	"M170.085 42.0683 170.085 42.0683 170.085 42.0683 170.085 42.0683 170.085 42.0683 148.365 84.5494 148.365 84.5494 96.0308 186 .5 0 43.9409 0 96.0379 101.889 148.135 0 191.576 0 170.085 42.0683 170.085 42.0683 170.085 42.0683 170.085 42.0683 170.085 42.0683Z",
	"M205.508 111.348 205.508 111.348 205.508 111.348 205.508 111.348 243.678 186 200.237 186 148.365 84.5494 96.0308 186 .5 0 43.9409 0 96.0379 101.889 148.135 0 191.576 0 170.085 42.0683 182.144 65.654 182.144 65.654 205.508 111.348 205.508 111.348Z",
	"M239.394 45.6091 218.422 86.2804 218.422 86.2804 205.508 111.348 243.678 186 200.237 186 148.365 84.5494 96.0308 186 .5 0 43.9409 0 96.0379 101.889 148.135 0 191.576 0 170.085 42.0683 182.144 65.654 215.969 0 239.394 45.6091 239.394 45.6091Z",
	"M311.5 186 268.059 186 218.422 86.2804 205.508 111.348 243.678 186 200.237 186 148.365 84.5494 96.0308 186 .5 0 43.9409 0 96.0379 101.889 148.135 0 191.576 0 170.085 42.0683 182.144 65.654 215.969 0 239.394 45.6091 311.5 186Z",
]

const values = computed(() => stages.join(";"))

const keySplines = computed(() => {
	return Array.from({ length: stages.length - 1 }, () => "0.87 0 0.13 1").join(";")
})

const keyTimes = computed(() => {
	const stepSize = 1 / (stages.length - 1)
	return Array.from({ length: stages.length }, (_, index) => {
		return Math.min(index * stepSize, 1)
	})
		.map((v) => Math.floor(v * 100) / 100)
		.join(";")
})

const width = 1200
const height = 630

const STAR_AMOUNT = 50
const X_SPEED = 0.125

const stars = Array.from({ length: STAR_AMOUNT })
	.fill(0)
	.map(() => {
		const star = {
			xStart: Math.random() * width,
			xSpeed: (Math.random() * X_SPEED + X_SPEED / 2) * width,
			size: Math.random() * 2 + 0.75,
			duration: (Math.random() * 0.25 + 0.05) * 300,
			begin: 0,
		}

		star.begin = Math.random() * (star.duration / 4)

		if (Math.random() > 0.5) {
			star.xSpeed *= -1
		}

		return star
	})

console.log("test 2")
</script>

<template>
	<svg
		:width="width"
		:height="height"
		:viewBox="`0 0 ${width} ${height}`"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g clip-path="url(#clip0_174_79)">
			<g id="backdrop" filter="url(#filter0_d_174_79)">
				<rect x="25" y="25" width="1150" height="580" rx="24" fill="black" />
				<g opacity="0.75">
					<rect
						x="25"
						y="25"
						width="1150"
						height="580"
						rx="24"
						fill="url(#paint0_radial_174_79)"
					/>
					<rect
						x="25"
						y="25"
						width="1150"
						height="580"
						rx="24"
						fill="url(#paint1_radial_174_79)"
					/>
					<rect
						x="25"
						y="25"
						width="1150"
						height="580"
						rx="24"
						fill="url(#paint2_radial_174_79)"
					/>
					<rect
						x="25"
						y="25"
						width="1150"
						height="580"
						rx="24"
						fill="url(#paint3_radial_174_79)"
					/>
				</g>
			</g>
			<clipPath id="background-clip">
				<rect x="25" y="25" width="1150" height="580" rx="24" fill="black" />
			</clipPath>
			<circle
				v-for="star in stars"
				:key="star.begin"
				:opacity="star.size / 7.5"
				:r="star.size"
				fill="white"
				clip-path="url(#background-clip)"
			>
				<animate
					attributeName="cy"
					:values="`${height}; 0`"
					:dur="`${star.duration}s`"
					:begin="`${star.begin}s`"
					repeatCount="indefinite"
				/>
				<animate
					attributeName="cx"
					:values="`${star.xStart}; ${star.xStart + star.xSpeed}`"
					:dur="`${star.duration}s`"
					:begin="`${star.begin}s`"
					repeatCount="indefinite"
				/>
			</circle>
			<g id="logo-glow" opacity="0" class="glow-fade-in">
				<rect
					x="-156"
					y="-176"
					width="1512"
					height="982"
					fill="url(#paint4_radial_174_79)"
					fill-opacity="0.41"
				/>
				<rect
					x="-156"
					y="-176"
					width="1512"
					height="982"
					fill="url(#paint5_radial_174_79)"
				/>
			</g>
			<svg
				id="logo"
				width="312"
				height="186"
				:x="width / 2 - 312 / 2"
				:y="height / 2 - 186 / 2"
				viewBox="0 0 312 186"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path ref="path" fill="white">
					<animate
						attributeName="d"
						begin="250ms"
						dur="750ms"
						fill="freeze"
						calcMode="spline"
						:keySplines="keySplines"
						:keyTimes="keyTimes"
						:values="values"
					/>
				</path>
			</svg>
		</g>
		<defs>
			<filter
				id="filter0_d_174_79"
				x="5"
				y="5"
				width="1198"
				height="628"
				filterUnits="userSpaceOnUse"
				color-interpolation-filters="sRGB"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dx="4" dy="4" />
				<feGaussianBlur stdDeviation="12" />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix
					type="matrix"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
				/>
				<feBlend
					mode="normal"
					in2="BackgroundImageFix"
					result="effect1_dropShadow_174_79"
				/>
				<feBlend
					mode="normal"
					in="SourceGraphic"
					in2="effect1_dropShadow_174_79"
					result="shape"
				/>
			</filter>
			<radialGradient
				id="paint0_radial_174_79"
				cx="0"
				cy="0"
				r="1"
				gradientUnits="userSpaceOnUse"
				gradientTransform="translate(325.5 680.5) rotate(15.6949) scale(691.274 559.341)"
			>
				<stop stop-color="#00FFE0" stop-opacity="0.43" />
				<stop offset="1" stop-opacity="0" />
			</radialGradient>
			<radialGradient
				id="paint1_radial_174_79"
				cx="0"
				cy="0"
				r="1"
				gradientUnits="userSpaceOnUse"
				gradientTransform="translate(1389 355.5) rotate(141.011) scale(936.808 834.471)"
			>
				<stop stop-color="#FF006B" stop-opacity="0.43" />
				<stop offset="1" stop-opacity="0" />
			</radialGradient>
			<radialGradient
				id="paint2_radial_174_79"
				cx="0"
				cy="0"
				r="1"
				gradientUnits="userSpaceOnUse"
				gradientTransform="translate(626 816) rotate(-2.07138) scale(943.598 733.209)"
			>
				<stop stop-color="#FF00E6" stop-opacity="0.46" />
				<stop offset="1" stop-opacity="0" />
			</radialGradient>
			<radialGradient
				id="paint3_radial_174_79"
				cx="0"
				cy="0"
				r="1"
				gradientUnits="userSpaceOnUse"
				gradientTransform="translate(-232.837 427.515) rotate(47.2401) scale(1118.59 1176.88)"
			>
				<stop stop-color="#7F00FF" stop-opacity="0.46" />
				<stop offset="1" stop-opacity="0" />
			</radialGradient>
			<radialGradient
				id="paint4_radial_174_79"
				cx="0"
				cy="0"
				r="1"
				gradientUnits="userSpaceOnUse"
				gradientTransform="translate(600 315) rotate(90) scale(491 910.359)"
			>
				<stop stop-color="white" stop-opacity="0.31" />
				<stop offset="1" stop-opacity="0" />
			</radialGradient>
			<radialGradient
				id="paint5_radial_174_79"
				cx="0"
				cy="0"
				r="1"
				gradientUnits="userSpaceOnUse"
				gradientTransform="translate(600 315) rotate(90) scale(235 382.651)"
			>
				<stop stop-color="white" stop-opacity="0.43" />
				<stop offset="1" stop-opacity="0" />
			</radialGradient>
			<clipPath id="clip0_174_79">
				<rect :width="width" :height="height" fill="white" />
			</clipPath>
		</defs>
	</svg>
</template>

<style scoped lang="scss">
.glow-fade-in {
	animation: fade-in 2000ms forwards;
	animation-delay: 500ms;
}
@keyframes fade-in {
	from {
		opacity: 0;
	}
	to {
		opacity: 0.4;
	}
}
</style>
