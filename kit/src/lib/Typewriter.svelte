{@html display || ' '}<!--
-->{#if !processEvents(hideCursor)}
	<typewriter-cursor class:blink={display === text}>_</typewriter-cursor>
{/if}

<style lang="postcss">
	.blink {
		animation: blink 1s step-end infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
</style>

<script lang="ts">
	type Event = 'beforeStart' | 'afterEnd'

	const {
		text,
		speed = 20,
		delay = 0,
		hideCursor,
	} = $props<{
		text: any
		speed?: number
		delay?: number
		hideCursor?: Event | Event[]
	}>()

	let display = $state('')

	function typewrite() {
		let i = 0
		const interval = setInterval(() => {
			display = text.slice(0, i)
			i++
			if (i > text.length) {
				clearInterval(interval)
			}
		}, speed)
		return () => clearInterval(interval)
	}

	$effect(() => {
		if (delay) {
			setTimeout(typewrite, delay * speed)
			return
		}

		typewrite()
	})

	function processEvents(event?: Event | Event[]): boolean {
		if (Array.isArray(event)) {
			return event.some((e) => processEvents(e))
		}

		switch (event) {
			case 'beforeStart':
				return display === ''
			case 'afterEnd':
				return display === text
			default:
				return false
		}
	}
</script>
