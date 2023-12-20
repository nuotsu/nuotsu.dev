<figure class="relative !mt-12 max-sm:full-bleed">
	<enhanced:img
		src="./me.jpg"
		sizes="min(400px, 100vw)"
		alt="Black and white photo of Mitchell"
		draggable={false}
	/>
</figure>

<style>
	figure {
		rotate: 4deg;
	}

	@supports (scroll-timeline: --scroll-timeline) {
		figure {
			animation: animate 1ms ease-in-out;
			animation-timeline: --scroll-timeline;
		}
	}

	@keyframes animate {
		from {
			rotate: -0.1turn;
		}
	}
</style>
