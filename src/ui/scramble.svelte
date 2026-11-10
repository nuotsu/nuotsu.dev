<script lang="ts">
	import { onDestroy, onMount, untrack } from 'svelte'
	import { intersectionObserver } from '#lib/attachments.ts'

	// wide glyphs only, so the width doesn't jitter in proportional fonts
	const CHARS = 'ABCDEGHKMNOPQRSUVWXYZ023456789@#$%&*+=?<>~'

	let {
		text,
		stagger = 60, // ms between each letter starting to scramble
		delay = 300, // ms each letter scrambles before settling
		tick = 50, // ms between random char swaps
		trigger = 'load', // 'load' = on mount (pair with {#key}), 'hover' = on pointer enter, 'view' = when scrolled into view
		class: className
	}: {
		text: string
		stagger?: number
		delay?: number
		tick?: number
		trigger?: 'load' | 'hover' | 'view'
		class?: string
	} = $props()

	let scrambled = $state<string | null>(null)
	let frame = 0
	let el: HTMLElement
	let touching = false

	const random = () => CHARS[Math.floor(Math.random() * CHARS.length)]

	// load/view hide the text until the animation starts, then every letter
	// scrambles right away and settles in order; hover scrambles letters in order
	const reveal = $derived(trigger !== 'hover')
	let hidden = $state(untrack(() => reveal))

	function scramble() {
		if (frame) return
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			hidden = false
			return
		}

		const start = performance.now()
		const end = (text.length - 1) * stagger + delay
		let last = -Infinity

		const render = (t: number) => {
			scrambled = Array.from(text, (char, i) => {
				const begin = reveal ? 0 : i * stagger
				if (char === ' ' || t < begin || t >= i * stagger + delay) return char
				return random()
			}).join('')
		}

		const step = (now: number) => {
			const t = now - start

			if (t >= end) {
				scrambled = null
				frame = 0
				return
			}

			if (now - last >= tick) {
				last = now
				render(t)
			}

			frame = requestAnimationFrame(step)
		}

		render(0)
		hidden = false
		frame = requestAnimationFrame(step)
	}

	// touch drags are captured by the element they start on, so pointerenter
	// never fires here — hit-test the finger position instead
	function ontouchmove(e: TouchEvent) {
		if (trigger !== 'hover') return
		const { clientX, clientY } = e.touches[0]
		const over = el.contains(document.elementFromPoint(clientX, clientY))
		if (over && !touching) scramble()
		touching = over
	}

	onMount(() => {
		if (trigger === 'load') scramble()
	})

	onDestroy(() => {
		if (frame) cancelAnimationFrame(frame)
	})
</script>

<svelte:window {ontouchmove} ontouchend={() => (touching = false)} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	bind:this={el}
	class={className}
	onpointerenter={trigger === 'hover' ? scramble : undefined}
	{@attach trigger === 'view'
		? intersectionObserver((entry) => entry.isIntersecting && scramble())
		: undefined}
	aria-label={text}
>
	<span aria-hidden="true" class:invisible={hidden}>{scrambled ?? text}</span>
</span>
