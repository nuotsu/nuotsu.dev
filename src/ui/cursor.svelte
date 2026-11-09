<script lang="ts">
	let x = $state(0)
	let y = $state(0)
	let visible = $state(false)
	let leaving = $state(false)
	let timer: ReturnType<typeof setTimeout>

	const INTERACTIVE = ':is(a[href], button, input, select, textarea, summary, label):not(:disabled)'
	const DURATION = 100 // ms

	function moveTo({ clientX, clientY }: { clientX: number; clientY: number }) {
		x = clientX
		y = clientY
		visible = true
	}

	function onpointerout({ target, relatedTarget }: PointerEvent) {
		const from = (target as Element | null)?.closest?.(INTERACTIVE)
		const to = (relatedTarget as Element | null)?.closest?.(INTERACTIVE)
		if (!from || to) return

		leaving = true
		clearTimeout(timer)
		timer = setTimeout(() => (leaving = false), DURATION)
	}
</script>

<svelte:window
	onpointermove={moveTo}
	onpointerdown={moveTo}
	ontouchmove={({ touches }) => touches[0] && moveTo(touches[0])}
	{onpointerout}
/>

<svelte:document onmouseleave={() => (visible = false)} />

<span
	class="pointer-events-none fixed z-9999 border-sm border-cp-cyan"
	class:invisible={!visible}
	class:leaving
	style:--duration="{DURATION}ms"
	style:--x="{x}px"
	style:--y="{y}px"
	aria-hidden="true"
></span>

<style>
	span {
		--size: 1ch;
		--r: calc(var(--size) / 2);
		inset: calc(var(--y) - var(--r)) calc(100% - var(--x) - var(--r))
			calc(100% - var(--y) - var(--r)) calc(var(--x) - var(--r));

		--cursor-path: polygon(
			evenodd,
			0 0,
			var(--size) 0,
			var(--size) var(--size),
			calc(100% - var(--size)) var(--size),
			calc(100% - var(--size)) 0,
			100% 0,
			100% var(--size),
			calc(100% - var(--size)) var(--size),
			calc(100% - var(--size)) calc(100% - var(--size)),
			100% calc(100% - var(--size)),
			100% 100%,
			calc(100% - var(--size)) 100%,
			calc(100% - var(--size)) calc(100% - var(--size)),
			var(--size) calc(100% - var(--size)),
			var(--size) 100%,
			0 100%,
			0 calc(100% - var(--size)),
			var(--size) calc(100% - var(--size)),
			var(--size) var(--size),
			0 var(--size)
		);
		clip-path: var(--cursor-path);

		&.leaving {
			transition: inset var(--duration);
		}
	}

	:global(:is(a[href], button, input, select, textarea, summary, label):not(:disabled):hover) {
		anchor-name: --cursor;
	}

	:global(
			:root:has(:is(a[href], button, input, select, textarea, summary, label):not(:disabled):hover)
		)
		span {
		--offset: 0.5ch;
		position-anchor: --cursor;
		inset: calc(anchor(top) - var(--offset)) calc(anchor(right) - var(--offset))
			calc(anchor(bottom) - var(--offset)) calc(anchor(left) - var(--offset));
		transition: inset var(--duration);
	}
</style>
