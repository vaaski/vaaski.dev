<script setup lang="ts">
const roundTo = (decimals: number, n: number) =>
	Math.round(n * 10 ** decimals) / 10 ** decimals

const logoStages = [
	"M 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 0.5 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 L 43.9409 0 Z",
	"M96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186 .5 0 43.9409 0 96.0379 101.889 96.0379 101.889 96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186 96.0308 186Z",
	"M170.085 42.0683 170.085 42.0683 170.085 42.0683 170.085 42.0683 170.085 42.0683 148.365 84.5494 148.365 84.5494 96.0308 186 .5 0 43.9409 0 96.0379 101.889 148.135 0 191.576 0 170.085 42.0683 170.085 42.0683 170.085 42.0683 170.085 42.0683 170.085 42.0683Z",
	"M205.508 111.348 205.508 111.348 205.508 111.348 205.508 111.348 243.678 186 200.237 186 148.365 84.5494 96.0308 186 .5 0 43.9409 0 96.0379 101.889 148.135 0 191.576 0 170.085 42.0683 182.144 65.654 182.144 65.654 205.508 111.348 205.508 111.348Z",
	"M239.394 45.6091 218.422 86.2804 218.422 86.2804 205.508 111.348 243.678 186 200.237 186 148.365 84.5494 96.0308 186 .5 0 43.9409 0 96.0379 101.889 148.135 0 191.576 0 170.085 42.0683 182.144 65.654 215.969 0 239.394 45.6091 239.394 45.6091Z",
	"M311.5 186 268.059 186 218.422 86.2804 205.508 111.348 243.678 186 200.237 186 148.365 84.5494 96.0308 186 .5 0 43.9409 0 96.0379 101.889 148.135 0 191.576 0 170.085 42.0683 182.144 65.654 215.969 0 239.394 45.6091 311.5 186Z",
]

const values = computed(() => logoStages.join(";"))
const easeInOutExpo = "0.87 0 0.13 1"
const easeOutExpo = "0.16, 1, 0.3, 1"

const keySplines = computed(() => {
	return Array.from({ length: logoStages.length - 1 }, () => easeInOutExpo).join(";")
})

const keyTimes = computed(() => {
	const stepSize = 1 / (logoStages.length - 1)
	return Array.from({ length: logoStages.length }, (_, index) => {
		return Math.min(index * stepSize, 1)
	})
		.map((v) => Math.floor(v * 100) / 100)
		.join(";")
})

const width = 1200
const height = 630

const logoWidth = 312
const logoHeight = 186

const STAR_AMOUNT = 30
const X_SPEED = 0.125
const ROUND_DECIMALS = 2

const stars = Array.from({ length: STAR_AMOUNT })
	.fill(0)
	.map(() => {
		const star = {
			xStart: Math.random() * width,
			xSpeed: (Math.random() * X_SPEED + X_SPEED / 2) * width,
			size: Math.random() * 2 + 1.25,
			duration: (Math.random() * 0.25 + 0.05) * 300,
			begin: 0,
		}

		star.begin = Math.random() * (star.duration / 4)

		if (Math.random() > 0.5) {
			star.xSpeed *= -1
		}

		star.xStart = roundTo(ROUND_DECIMALS, star.xStart)
		star.xSpeed = roundTo(ROUND_DECIMALS, star.xSpeed)
		star.size = roundTo(ROUND_DECIMALS, star.size)
		star.duration = roundTo(ROUND_DECIMALS, star.duration)
		star.begin = roundTo(ROUND_DECIMALS, star.begin)

		return star
	})
</script>

<template>
	<svg :width="width" :height="height" xmlns="http://www.w3.org/2000/svg">
		<g filter="url(#s)">
			<rect x="25" y="25" width="1150" height="580" rx="24" fill="black" />
			<g opacity="0.75">
				<rect x="25" y="25" width="1150" height="580" rx="24" fill="url(#p0)" />
				<rect x="25" y="25" width="1150" height="580" rx="24" fill="url(#p1)" />
				<rect x="25" y="25" width="1150" height="580" rx="24" fill="url(#p2)" />
				<rect x="25" y="25" width="1150" height="580" rx="24" fill="url(#p3)" />
			</g>
		</g>
		<clipPath id="background-clip">
			<rect x="25" y="25" width="1150" height="580" rx="24" fill="black" />
		</clipPath>
		<circle
			v-for="star in stars"
			:key="star.begin"
			:opacity="roundTo(ROUND_DECIMALS, star.size / 7.5)"
			:r="star.size"
			fill="#fff"
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
				:values="`${star.xStart}; ${roundTo(ROUND_DECIMALS, star.xStart + star.xSpeed)}`"
				:dur="`${star.duration}s`"
				:begin="`${star.begin}s`"
				repeatCount="indefinite"
			/>
		</circle>
		<g clip-path="url(#background-clip)" opacity="0">
			<!-- logo glow -->
			<animate
				attributeName="opacity"
				values="0;0.3"
				dur="3s"
				begin="0.5s"
				fill="freeze"
			/>
			<rect
				x="-156"
				y="-176"
				width="1512"
				height="982"
				fill="url(#p4)"
				fill-opacity="0.41"
			/>
			<rect x="-156" y="-176" width="1512" height="982" fill="url(#p5)" />
		</g>
		<!-- logo -->
		<svg
			:width="logoWidth"
			:height="logoHeight"
			:x="width / 2 - logoWidth / 2"
			:y="height / 2 - logoHeight / 2"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				ref="path"
				fill="white"
				:transform-origin="`${logoWidth / 2} ${logoHeight / 2}`"
			>
				<!-- animate scale-in -->
				<animateTransform
					attributeName="transform"
					from="0 0"
					to="1 1"
					begin="0s"
					dur="2.5s"
					fill="freeze"
					type="scale"
					calcMode="spline"
					:keySplines="easeOutExpo"
					keyTimes="0;1"
				/>
				<!-- animate path -->
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
		<defs>
			<filter
				id="s"
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
				<feBlend mode="normal" in2="BackgroundImageFix" result="e1" />
				<feBlend mode="normal" in="SourceGraphic" in2="e1" result="shape" />
			</filter>
			<radialGradient
				id="p0"
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
				id="p1"
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
				id="p2"
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
				id="p3"
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
				id="p4"
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
				id="p5"
				cx="0"
				cy="0"
				r="1"
				gradientUnits="userSpaceOnUse"
				gradientTransform="translate(600 315) rotate(90) scale(235 382.651)"
			>
				<stop stop-color="white" stop-opacity="0.43" />
				<stop offset="1" stop-opacity="0" />
			</radialGradient>
		</defs>
	</svg>
</template>
