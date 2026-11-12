<script lang="ts">
	import defaultSize from '#lib/assets/portrait-variants/netrunner.png?size'
	import psychoSize from '#lib/assets/portrait-variants/netrunner-cyberpsychosis.png?size'
	import { cyberpsychosis } from '#lib/cyberpsychosis.svelte.ts'
	import posthog from 'posthog-js'

	const CLICKS_TO_SWITCH = 10
	const GLITCH_MS = 700

	let clicks = $state(0)
	let psycho = $derived(cyberpsychosis.active)
	let remaining = $derived(CLICKS_TO_SWITCH - (clicks % CLICKS_TO_SWITCH))
	let glitching = $state(false)

	// SVG filter params, driven per-frame while glitching
	let seed = $state(0)
	let scale = $state(0)
	let offset = $state(0)
	let freqY = $state(0.2)

	function onclick() {
		if (glitching) return
		if (++clicks % CLICKS_TO_SWITCH !== 0) return

		posthog.capture('cyberpsychosis_toggled', { active: !cyberpsychosis.active, clicks })

		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			cyberpsychosis.active = !cyberpsychosis.active
			return
		}

		glitch()
	}

	function glitch() {
		glitching = true
		let swapped = false
		const start = performance.now()

		function frame(now: number) {
			const t = (now - start) / GLITCH_MS

			if (t >= 1) {
				scale = offset = 0
				glitching = false
				return
			}

			if (!swapped && t >= 0.5) {
				cyberpsychosis.active = !cyberpsychosis.active
				swapped = true
			}

			// intensity peaks at the swap, with random stutter
			const intensity = Math.sin(t * Math.PI) * (Math.random() < 0.25 ? 0.2 : 1)

			seed = Math.floor(Math.random() * 1000)
			freqY = 0.05 + Math.random() * 0.4
			scale = intensity * (40 + Math.random() * 80)
			offset = intensity * (Math.random() * 16 - 8)

			requestAnimationFrame(frame)
		}

		requestAnimationFrame(frame)
	}
</script>

<figure
	class="bevel sticky top-ch grid aspect-square overflow-clip bevel-tl bevel-br rounded-br-[2lh] p-0 *:col-span-full *:row-span-full before:slashes sm:before:slashes-20"
>
	<svg class="pointer-events-none absolute size-0" aria-hidden="true">
		<filter
			id="headshot-glitch"
			x="-10%"
			y="-10%"
			width="120%"
			height="120%"
			color-interpolation-filters="sRGB"
		>
			<feTurbulence
				type="fractalNoise"
				baseFrequency="0.0001 {freqY}"
				numOctaves="1"
				{seed}
				result="noise"
			/>
			<feDisplacementMap
				in="SourceGraphic"
				in2="noise"
				{scale}
				xChannelSelector="R"
				yChannelSelector="A"
				result="displaced"
			/>

			<!-- chromatic aberration: split red from green/blue -->
			<feColorMatrix
				in="displaced"
				type="matrix"
				values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
				result="red"
			/>
			<feOffset in="red" dx={offset} result="red-shifted" />
			<feColorMatrix
				in="displaced"
				type="matrix"
				values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
				result="cyan"
			/>
			<feOffset in="cyan" dx={-offset} result="cyan-shifted" />
			<feBlend in="red-shifted" in2="cyan-shifted" mode="screen" />
		</filter>
	</svg>

	<button
		type="button"
		class="layers grid size-full *:col-span-full *:row-span-full"
		class:glitching
		aria-label="Headshot"
		{onclick}
	>
		<div class:hidden-layer={psycho}>
			<enhanced:img
				class="size-full object-cover"
				src="#lib/assets/portrait-variants/netrunner.png"
				alt="Mitchell Christ"
				draggable="false"
				data-cursor
			/>
		</div>

		<div class:hidden-layer={!psycho}>
			<enhanced:img
				class="size-full object-cover"
				src="#lib/assets/portrait-variants/netrunner-cyberpsychosis.png"
				alt="Mitchell Christ (cyberpsychosis)"
				draggable="false"
				data-cursor
			/>
		</div>
	</button>

	<figcaption class="pointer-events-none mt-auto p-ch text-[.5em] opacity-40">
		<dl class="grid grid-cols-[auto_1fr] gap-x-ch">
			<dt>Image type:</dt>
			<dt>.PNG</dt>
			<dt>File size:</dt>
			<dt>{(psycho ? psychoSize : defaultSize).toLocaleString()} bytes</dt>
			{#if psycho}
				<dt>Recovery:</dt>
				<dt>{remaining} clicks to reboot</dt>
			{:else}
				<dt>Humanity:</dt>
				<dt>{Math.round((remaining / CLICKS_TO_SWITCH) * 100)}% remaining</dt>
			{/if}
		</dl>
	</figcaption>
</figure>

<style>
	figure {
		&::before {
			position: absolute;
			top: 0;
			left: 0;
			margin-top: 0.3ch;
			margin-left: 0.7ch;
			height: 0.7ch;
		}

		&::after {
			content: '?';
			display: grid;
			place-content: center;
			grid-column: 1 / -1;
			grid-row: 1 / -1;
			font-weight: bold;
		}

		:global(picture) {
			display: block;
			height: 100%;
			filter: brightness(0) invert(1);
			clip-path: inset(calc(50% - 0.5px) 50% calc(50% - 0.5px) 50%);
			animation: appear 1s ease-in-out 1s forwards;
		}
	}

	.layers {
		cursor: inherit;

		&.glitching {
			filter: url(#headshot-glitch);
		}

		> div {
			min-height: 0;
			height: 100%;
		}
	}

	.hidden-layer {
		visibility: hidden;
	}

	@keyframes appear {
		20% {
			filter: brightness(0) invert(1);
			clip-path: inset(calc(50% - 0.5px) 0 calc(50% - 0.5px) 0);
		}

		60% {
			clip-path: inset(calc(50% - 0.5px) 0 calc(50% - 0.5px) 0);
		}

		100% {
			filter: brightness(1);
			clip-path: inset(0 0 0 0);
		}
	}
</style>
