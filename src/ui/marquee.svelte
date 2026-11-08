<script lang="ts" generics="T">
	import type { Snippet } from 'svelte'

	let {
		items,
		speed = 50,
		item: render,
		class: className = ''
	}: {
		items: T[]
		/** px per second */
		speed?: number
		item?: Snippet<[T, number]>
		class?: string
	} = $props()

	let container: HTMLElement
	let track: HTMLElement
	const els: HTMLElement[] = []

	let m = $state<{
		container: number
		content: number
		boxes: { left: number; width: number }[]
	}>()

	function measure() {
		m = {
			container: container.clientWidth,
			content: track.offsetWidth,
			// `translate` doesn't affect layout, so these are the resting positions
			boxes: els
				.slice(0, items.length)
				.map((el) => ({ left: el.offsetLeft, width: el.offsetWidth }))
		}
	}

	$effect(() => {
		items // re-measure when items change
		const ro = new ResizeObserver(measure) // fires once on observe, then on resize / font load
		ro.observe(container)
		ro.observe(track)
		return () => ro.disconnect()
	})

	/**
	 * Every item travels `loop` px at the same speed, so spacing is preserved across the wrap.
	 * For an item to re-enter from beyond the right edge, `loop` must be >= container + widest item.
	 * Any surplus over the content width is spread evenly between items as `spread` px each.
	 */
	const layout = $derived.by(() => {
		if (!m?.boxes.length) return
		const widest = Math.max(...m.boxes.map((b) => b.width))
		const loop = Math.max(m.content, m.container + widest)
		return { loop, spread: (loop - m.content) / m.boxes.length }
	})

	function vars(i: number) {
		const b = m?.boxes[i]
		if (!layout || !b) return ''
		const { loop, spread } = layout
		const end = -(b.left + b.width) // right edge reaches the container's left edge
		const start = end + loop // left edge beyond the container's right edge
		// initial position: the whole row queued just past the right edge, surplus spread between items
		const initial = m!.container + i * spread
		// positive delay holds the item at `start` (fill-mode: backwards) until it's due to enter
		return `--from:${start}px;--to:${end}px;animation-delay:${(initial - start) / speed}s`
	}
</script>

<div bind:this={container} class="overflow-clip {className}">
	<div
		bind:this={track}
		class="relative flex w-max whitespace-nowrap *:shrink-0"
		class:running={!!layout}
		class:invisible={!layout}
		style:--duration="{(layout?.loop ?? 0) / speed}s"
	>
		{#each items as it, i}
			<span class="pr-lh" bind:this={els[i]} style={vars(i)}>
				{#if render}
					{@render render(it, i)}
				{:else}
					{it}
				{/if}
			</span>
		{/each}
	</div>
</div>

<style>
	.running > * {
		animation: marquee var(--duration) linear infinite backwards;
	}

	@keyframes marquee {
		from {
			translate: var(--from) 0;
		}
		to {
			translate: var(--to) 0;
		}
	}
</style>
