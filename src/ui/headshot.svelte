<script lang="ts">
	import defaultSize from '#lib/assets/portrait-variants/netrunner.png?size'
	import psychoSize from '#lib/assets/portrait-variants/netrunner-cyberpsychosis.png?size'
	import { cyberpsychosis } from '#lib/cyberpsychosis.svelte.ts'
	import posthog from 'posthog-js'
	import { onMount } from 'svelte'

	const CLICKS_TO_SWITCH = 10
	const GLITCH_MS = 700
	const STREAK_TIMEOUT_MS = 3000

	let clicks = $state(0)
	let avatar: HTMLButtonElement
	let streak = $state<{ id: string; count: number; startedAt: number } | null>(null)
	let streakTimeout: ReturnType<typeof setTimeout> | undefined
	let press: { id: number; x: number; y: number; moved: number } | null = null
	let dragged = false
	let pointerType = 'mouse'
	let animationFrame = 0
	let glitchTarget: boolean | null = null
	let psycho = $derived(cyberpsychosis.active)
	let remaining = $derived(CLICKS_TO_SWITCH - (streak?.count ?? 0))
	let glitching = $state(false)

	// SVG filter params, driven per-frame while glitching
	let seed = $state(0)
	let scale = $state(0)
	let offset = $state(0)
	let freqY = $state(0.2)

	function endStreak(toggled = false, now = performance.now()) {
		clearTimeout(streakTimeout)
		if (!streak) return
		posthog.capture('avatar_streak_ended', {
			streak_id: streak.id,
			max_streak: streak.count,
			duration_ms: Math.round(now - streak.startedAt),
			toggled
		})
		streak = null
	}

	function onclick(e: MouseEvent) {
		if (dragged && e.detail !== 0) return
		const now = performance.now()
		streak ??= { id: crypto.randomUUID(), count: 0, startedAt: now }
		streak.count++
		clicks++
		clearTimeout(streakTimeout)
		posthog.capture('avatar_tapped', { streak_count: streak.count, streak_id: streak.id })
		if (streak.count !== CLICKS_TO_SWITCH) {
			streakTimeout = setTimeout(() => endStreak(), STREAK_TIMEOUT_MS)
			return
		}

		const active = !(glitchTarget ?? cyberpsychosis.active)
		posthog.capture('cyberpsychosis_toggled', {
			active,
			clicks,
			streak_id: streak.id,
			state: active ? 'on' : 'off',
			duration_ms: Math.round(now - streak.startedAt),
			pointer_type: (e as PointerEvent).pointerType || (e.detail === 0 ? 'mouse' : pointerType)
		})
		endStreak(true, now)

		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			cancelAnimationFrame(animationFrame)
			glitchTarget = null
			glitching = false
			cyberpsychosis.active = active
			return
		}

		glitch(active)
	}

	function glitch(active: boolean) {
		cancelAnimationFrame(animationFrame)
		glitchTarget = active
		glitching = true
		let swapped = false
		const start = performance.now()

		function frame(now: number) {
			const t = (now - start) / GLITCH_MS

			if (!swapped && t >= 0.5) {
				cyberpsychosis.active = active
				glitchTarget = null
				swapped = true
			}
			if (t >= 1) {
				scale = offset = 0
				glitching = false
				return
			}

			// intensity peaks at the swap, with random stutter
			const intensity = Math.sin(t * Math.PI) * (Math.random() < 0.25 ? 0.2 : 1)

			seed = Math.floor(Math.random() * 1000)
			freqY = 0.05 + Math.random() * 0.4
			scale = intensity * (40 + Math.random() * 80)
			offset = intensity * (Math.random() * 16 - 8)

			animationFrame = requestAnimationFrame(frame)
		}

		animationFrame = requestAnimationFrame(frame)
	}

	onMount(() => {
		function onpointerdown(e: PointerEvent) {
			if (!avatar.contains(e.target as Node)) {
				endStreak()
				return
			}
			if (press) return
			dragged = false
			pointerType = e.pointerType
			press = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: 0 }
		}
		function onpointermove(e: PointerEvent) {
			if (!press || press.id !== e.pointerId) return
			press.moved += Math.abs(e.clientX - press.x) + Math.abs(e.clientY - press.y)
			press.x = e.clientX
			press.y = e.clientY
			if (press.moved > 6) {
				dragged = true
				endStreak()
			}
		}
		function onpointerup(e: PointerEvent) {
			if (!press || press.id !== e.pointerId) return
			onpointermove(e)
			if (e.type === 'pointercancel' || !avatar.contains(e.target as Node)) {
				dragged = true
				endStreak()
			}
			press = null
		}
		const onblur = () => {
			press = null
			endStreak()
		}
		addEventListener('pointerdown', onpointerdown)
		addEventListener('pointermove', onpointermove, { passive: true })
		addEventListener('pointerup', onpointerup)
		addEventListener('pointercancel', onpointerup)
		addEventListener('blur', onblur)
		return () => {
			endStreak()
			cancelAnimationFrame(animationFrame)
			removeEventListener('pointerdown', onpointerdown)
			removeEventListener('pointermove', onpointermove)
			removeEventListener('pointerup', onpointerup)
			removeEventListener('pointercancel', onpointerup)
			removeEventListener('blur', onblur)
		}
	})
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
		bind:this={avatar}
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
