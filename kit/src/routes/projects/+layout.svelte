<slot />

<style>
	:global(body:has([data-route^='/projects'])) {
		background: #30d148
			repeating-linear-gradient(
				to bottom,
				#30d148,
				#30d148 4px,
				#198020 4px,
				#198020 8px
			);
	}
</style>
