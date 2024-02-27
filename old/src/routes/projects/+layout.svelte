<slot />

<style>
	:global(body:has([data-route^='/projects'])) {
		background: #30d148
			repeating-linear-gradient(
				to bottom,
				#30d148 var(--offset, 0px),
				#30d148 calc(4px + var(--offset, 0px)),
				#198020 calc(4px + var(--offset, 0px)),
				#198020 calc(8px + var(--offset, 0px))
			);
		animation: slide 1s linear infinite;
	}

	@property --offset {
		syntax: '<length>';
		initial-value: 0px;
		inherits: false;
	}

	@keyframes slide {
		to {
			--offset: -8px;
		}
	}
</style>
