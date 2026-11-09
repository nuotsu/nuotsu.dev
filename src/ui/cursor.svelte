<script lang="ts">
	let x = $state(0)
	let y = $state(0)
	let visible = $state(false)
</script>

<svelte:window
	onpointermove={({ clientX, clientY }) => {
		x = clientX
		y = clientY
		visible = true
	}}
/>

<svelte:document onmouseleave={() => (visible = false)} />

<span
	class="pointer-events-none fixed top-0 left-0 z-9999 size-ch border-sm border-cp-cyan"
	class:invisible={!visible}
	style:translate="calc({x}px - 50%) calc({y}px - 50%)"
	aria-hidden="true"
></span>
