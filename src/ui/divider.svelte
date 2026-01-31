<div class="h-lh"></div>

<style>
	div {
		--color: color-mix(in srgb, currentColor 25%, transparent);
		background: 0 50% / 1lh calc(2lh - 3.5px)
			repeating-linear-gradient(
				135deg,
				transparent,
				transparent 1lh,
				var(--color) 1lh,
				var(--color) calc(1lh + 0.5px)
			);
		animation: move linear;
		animation-timeline: view();
	}

	@keyframes move {
		to {
			background-position-x: 6lh;
		}
	}
</style>
