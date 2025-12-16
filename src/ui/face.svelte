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
	class="aspect-square size-[4lh]"
	style:--x={Math.floor((mouse_x / window_w) * 11)}
	style:--y={Math.floor(1 - (mouse_y / window_h) * 11 - 1)}
	bind:this={elem}
></figure>

<output>{elem_x}%, {elem_y}%</output>

<style>
	figure {
		background: url($assets/mitchell-sprite.webp);
		background-size: calc(100% * 11);
		background-position: calc(100% * var(--x, 0) / 10)
			calc(100% * var(--y, 0) / 10);
	}
</style>
