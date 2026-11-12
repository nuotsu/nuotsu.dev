<script lang="ts">
	let x = $state(0)
	let y = $state(0)
	let visible = $state(false)
	let leaving = $state(false)
	let pressed = $state(false) // pointer down on a non-interactive target
	let dragging = $state(false)
	let focused = $state(false) // an interactive element has keyboard (:focus-visible) focus
	let origin = { x: 0, y: 0 }
	let timer: ReturnType<typeof setTimeout>

	const INTERACTIVE =
		':is(a[href], button, input, select, textarea, summary, label, [data-cursor]):not(:disabled, [data-cursor="false"], [data-cursor-disabled])'
	const DURATION = 100 // ms
	const DRAG_THRESHOLD = 4 // px

	function moveTo({ clientX, clientY }: { clientX: number; clientY: number }) {
		x = clientX
		y = clientY
		visible = true
	}

	function onpointerdown(e: PointerEvent) {
		moveTo(e)
		origin = { x: e.clientX, y: e.clientY }
		pressed = !(e.target as Element | null)?.closest?.(INTERACTIVE)
		dragging = false
	}

	function onpointermove(e: PointerEvent) {
		moveTo(e)
		if (!e.buttons) return release()
		if (!dragging && Math.hypot(e.clientX - origin.x, e.clientY - origin.y) > DRAG_THRESHOLD) {
			dragging = true
		}
	}

	function release() {
		pressed = false
		dragging = false
	}

	function onpointerout({ target, relatedTarget }: PointerEvent) {
		const from = (target as Element | null)?.closest?.(INTERACTIVE)
		const to = (relatedTarget as Element | null)?.closest?.(INTERACTIVE)
		if (!from || to) return

		leaving = true
		clearTimeout(timer)
		timer = setTimeout(() => (leaving = false), DURATION)
	}

	// focusout + focusin fire in the same task when tabbing, so the focus cursor
	// stays mounted (and animates) between elements, and mounts in place on first focus
	function onfocusin({ target }: FocusEvent) {
		const el = target as Element | null
		focused = !!(
			el?.matches?.(`${INTERACTIVE}:focus-visible`) ||
			(el?.matches?.('[data-cursor-disabled]:focus-visible') && el.parentElement?.closest(INTERACTIVE))
		)
	}
</script>

<svelte:window
	{onpointermove}
	{onpointerdown}
	onpointerup={release}
	onpointercancel={release}
	onblur={release}
	ontouchmove={({ touches }) => touches[0] && moveTo(touches[0])}
	{onpointerout}
	{onfocusin}
	onfocusout={() => (focused = false)}
/>

<svelte:document onmouseleave={() => (visible = false)} />

<span
	class={[
		'cursor mouse pointer-events-none fixed z-9999 border-sm border-current select-none',
		dragging ? 'text-cp-amber' : 'text-cp-cyan',
		pressed && 'bg-current/30'
	]}
	class:invisible={!visible}
	class:leaving
	style:--duration="{DURATION}ms"
	style:--x="{x}px"
	style:--y="{y}px"
	aria-hidden="true"
></span>

{#if focused}
	<span
		class="cursor focus pointer-events-none fixed z-9998 border-sm border-current text-cp-amber select-none"
		style:--duration="{DURATION}ms"
		aria-hidden="true"
	></span>
{/if}

<style>
	.cursor {
		--size: 1ch;
		--offset: 0.5ch;

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
	}

	/* mouse: follows the mouse, locks onto hovered elements */

	.mouse {
		--r: calc(var(--size) / 2);
		inset: calc(var(--y) - var(--r)) calc(100% - var(--x) - var(--r))
			calc(100% - var(--y) - var(--r)) calc(var(--x) - var(--r));

		&.leaving {
			transition: inset var(--duration);
		}
	}

	:global(
		:is(a[href], button, input, select, textarea, summary, label, [data-cursor]):not(
				:disabled,
				[data-cursor='false'],
				[data-cursor-disabled]
			):hover
	) {
		anchor-name: --cursor;
	}

	:global(
			:root:has(
				:is(a[href], button, input, select, textarea, summary, label, [data-cursor]):not(
						:disabled,
						[data-cursor='false'],
						[data-cursor-disabled]
					):hover
			)
		)
		.mouse {
		position-anchor: --cursor;
		inset: calc(anchor(top) - var(--offset)) calc(anchor(right) - var(--offset))
			calc(anchor(bottom) - var(--offset)) calc(anchor(left) - var(--offset));
		transition: inset var(--duration);
	}

	/* focus: locks onto the keyboard-focused element */

	:global(
		:is(a[href], button, input, select, textarea, summary, label, [data-cursor]):not(
				:disabled,
				[data-cursor='false'],
				[data-cursor-disabled]
			):is(:focus-visible, :has([data-cursor-disabled]:focus-visible))
	) {
		anchor-name: --cursor-focus;
	}

	.focus {
		position-anchor: --cursor-focus;
		inset: calc(anchor(top) - var(--offset)) calc(anchor(right) - var(--offset))
			calc(anchor(bottom) - var(--offset)) calc(anchor(left) - var(--offset));
		transition: inset var(--duration);
	}
</style>
