<figure class="relative !mt-12 before:top-0 after:bottom-0 max-sm:full-bleed">
	<enhanced:img
		src="./me.jpg"
		sizes="min(400px, 100vw)"
		alt="Black and white photo of Mitchell"
		draggable={false}
	/>
</figure>

<style>
	figure::before,
	figure::after {
		@apply absolute inset-x-0 block h-16 from-black to-transparent;
	}

	figure::before {
		@apply bg-gradient-to-b;
	}

	figure::after {
		@apply bg-gradient-to-t;
	}
</style>
