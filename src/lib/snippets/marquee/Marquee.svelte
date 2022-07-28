<figure style:--width="{offsetWidth}px">
	{#each Array(2).fill(null) as _}
		<div style:animation-duration={duration} bind:offsetWidth>
			<slot></slot>
		</div>
	{/each}
</figure>

<style>
	figure {
		display: flex;
		overflow: hidden;
		max-width: var(--width);
	}

	div {
		flex-shrink: 0;
		animation: marquee linear infinite;
	}

	@keyframes marquee {
		to {
			transform: translateX(-100%)
		}
	}
</style>

<script>
	export let duration = '4s'

	let offsetWidth
</script>
