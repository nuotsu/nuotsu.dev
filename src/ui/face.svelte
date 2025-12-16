<script lang="ts">
	let window_w = $state(0),
		window_h = $state(0)
	let mouse_x = $state(0),
		mouse_y = $state(0)

	let elem = $state<any>()
	let elem_x = $state(updateElement().x)
	let elem_y = $state(updateElement().y)

	function updateElement() {
		return {
			x:
				Math.round(
					((elem?.getBoundingClientRect()?.left +
						elem?.getBoundingClientRect().width / 2) /
						window_w) *
						100,
				) || 0,
			y:
				Math.round(
					((elem?.getBoundingClientRect()?.top +
						elem?.getBoundingClientRect().height / 2) /
						window_h) *
						100,
				) || 0,
		}
	}

	function getWeightedPosition(
		mousePos: number,
		windowSize: number,
		elemCenterPercent: number,
	) {
		if (!elem || windowSize === 0) return 0

		const mousePercent = (mousePos / windowSize) * 100

		// Calculate weighted position based on figure's placement
		// The space to the left of the figure center maps to 0-45% of background-position
		// The space to the right of the figure center maps to 45-100% of background-position
		if (mousePercent <= elemCenterPercent) {
			// Mouse is at or to the left of the figure center
			// Map 0% to elemCenterPercent% of viewport to 0% to 45% of background-position
			const ratio = elemCenterPercent > 0 ? mousePercent / elemCenterPercent : 0
			return ratio * 45
		} else {
			// Mouse is to the right of the figure center
			// Map elemCenterPercent% to 100% of viewport to 45% to 100% of background-position
			const remainingSpace = 100 - elemCenterPercent
			const ratio =
				remainingSpace > 0
					? (mousePercent - elemCenterPercent) / remainingSpace
					: 0
			return 45 + ratio * 55
		}
	}

	function getBackgroundX() {
		if (!elem || window_w === 0) return 0
		const weightedPercent = getWeightedPosition(mouse_x, window_w, elem_x)
		return Math.floor((weightedPercent / 100) * 11)
	}

	function getBackgroundY() {
		if (!elem || window_h === 0) return 0
		const weightedPercent = getWeightedPosition(mouse_y, window_h, elem_y)
		// Invert Y axis (mouse at top = background at top)
		return Math.floor((1 - weightedPercent / 100) * 11)
	}

	$effect(() => {
		elem_x = updateElement().x
		elem_y = updateElement().y
	})
</script>

<svelte:window
	on:mousemove={(e) => {
		mouse_x = e.clientX
		mouse_y = e.clientY
	}}
	on:scroll={() => {
		const { x, y } = updateElement()
		elem_x = x
		elem_y = y
	}}
	bind:innerWidth={window_w}
	bind:innerHeight={window_h}
/>

<figure
	id="face"
	class="aspect-square size-[6lh] shadow-lg"
	style:--x={getBackgroundX()}
	style:--y={getBackgroundY()}
	bind:this={elem}
></figure>

<style>
	figure {
		background: url($assets/mitchell-sprite.webp);
		background-size: calc(100% * 11);
		background-position: calc(100% * var(--x, 0) / 10)
			calc(100% * var(--y, 0) / 10);
	}
</style>
