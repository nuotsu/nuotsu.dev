<style>
	:global(body:has([data-route='/'])) {
		background: #000;

		& :global(main::before) {
			content: '';
			grid-column: bleed;
			position: sticky;
			top: 0;
			height: 3rem;
			display: block;
			background-image: linear-gradient(
				to bottom,
				#c6fbcf calc(100% / 8),
				#7afb82 calc(100% / 8),
				#7afb82 calc(100% / 8 * 2),
				#73db6c calc(100% / 8 * 2),
				#73db6c calc(100% / 8 * 3),
				#6aba59 calc(100% / 8 * 3),
				#6aba59 calc(100% / 8 * 4),
				#649a42 calc(100% / 8 * 4),
				#649a42 calc(100% / 8 * 5),
				#5a7a31 calc(100% / 8 * 5),
				#5a7a31 calc(100% / 8 * 6),
				#5a5921 calc(100% / 8 * 6),
				#5a5921 calc(100% / 8 * 7),
				#3b3910 calc(100% / 8 * 7),
				#3b3910 100%
			);
		}
	}
</style>
