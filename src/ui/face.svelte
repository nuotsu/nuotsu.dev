<script lang="ts">
	let width = $state(0),
		height = $state(0)
	let pos_x = $state(0),
		pos_y = $state(0)
</script>

<svelte:window
	on:mousemove={(e) => {
		pos_x = e.clientX
		pos_y = e.clientY
	}}
	bind:innerWidth={width}
	bind:innerHeight={height}
/>

<figure
	class="aspect-square size-[4lh]"
	style:--x={Math.floor((pos_x / width) * 11)}
	style:--y={Math.floor(1 - (pos_y / height) * 11 - 1)}
></figure>

<!-- <output>({pos_x}, {pos_y})</output> -->

<style>
	figure {
		background: url($assets/mitchell-sprite.webp);
		background-size: calc(100% * 11);
		background-position: calc(100% * var(--x, 0) / 10)
			calc(100% * var(--y, 0) / 10);
	}
</style>
