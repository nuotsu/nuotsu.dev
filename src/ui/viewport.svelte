<script lang="ts">
	let x = $state(0)
	let y = $state(0)

	function moveTo({ clientX, clientY }: { clientX: number; clientY: number }) {
		x = clientX
		y = clientY
	}

	let scrollPx = $state(0)
	let scrollMax = $state(0)
	let scrollPct = $derived(scrollMax > 0 ? (scrollPx / scrollMax) * 100 : 0)

	// browser-only: document doesn't exist during SSR
	$effect(() => {
		const root = document.documentElement
		const measure = () => (scrollMax = root.scrollHeight - root.clientHeight)
		const observer = new ResizeObserver(measure)
		observer.observe(root)
		addEventListener('resize', measure)
		measure()
		return () => {
			observer.disconnect()
			removeEventListener('resize', measure)
		}
	})
</script>

<svelte:window
	bind:scrollY={scrollPx}
	onpointermove={moveTo}
	onpointerdown={moveTo}
	ontouchmove={({ touches }) => touches[0] && moveTo(touches[0])}
/>

<output
	class="pointer-events-none fixed top-0 right-0 -z-1 grid h-svh w-rlh items-start justify-end text-right font-numeric text-[.5em] opacity-30 select-none"
>
	<span>{x.toFixed(1)}° {y.toFixed(1)}°</span>
	<span> {scrollPx}px {scrollPct.toFixed(1)}% </span>
</output>

<style>
	output {
		writing-mode: vertical-lr;
		padding-bottom: max(env(safe-area-inset-bottom), 0.5ch);
	}
</style>
