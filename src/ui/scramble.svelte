<script lang="ts">
	import { onDestroy } from 'svelte'

	// wide glyphs only, so the width doesn't jitter in proportional fonts
	const CHARS = 'ABCDEGHKMNOPQRSUVWXYZ023456789@#$%&*+=?<>~'

	let {
		text,
		stagger = 60, // ms between each letter starting to scramble
		duration = 300, // ms each letter scrambles before settling
		tick = 50 // ms between random char swaps
	}: { text: string; stagger?: number; duration?: number; tick?: number } = $props()

	let scrambled = $state<string | null>(null)
	let frame = 0
	let el: HTMLElement
	let touching = false

	const random = () => CHARS[Math.floor(Math.random() * CHARS.length)]

	function scramble() {
		if (frame) return
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

		const start = performance.now()
		const end = (text.length - 1) * stagger + duration
		let last = -Infinity

		const step = (now: number) => {
			const t = now - start

			if (t >= end) {
				scrambled = null
				frame = 0
				return
			}

			if (now - last >= tick) {
				last = now
				scrambled = Array.from(text, (char, i) => {
					const begin = i * stagger
					if (char === ' ' || t < begin || t >= begin + duration) return char
					return random()
				}).join('')
			}

			frame = requestAnimationFrame(step)
		}

		frame = requestAnimationFrame(step)
	}

	// touch drags are captured by the element they start on, so pointerenter
	// never fires here — hit-test the finger position instead
	function ontouchmove(e: TouchEvent) {
		const { clientX, clientY } = e.touches[0]
		const over = el.contains(document.elementFromPoint(clientX, clientY))
		if (over && !touching) scramble()
		touching = over
	}

	onDestroy(() => {
		if (frame) cancelAnimationFrame(frame)
	})
</script>

<svelte:window {ontouchmove} ontouchend={() => (touching = false)} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span bind:this={el} onpointerenter={scramble} aria-label={text}>
	<span aria-hidden="true">{scrambled ?? text}</span>
</span>
