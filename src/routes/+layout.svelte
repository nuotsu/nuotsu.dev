<main class="before:top-0 after:bottom-0">
	<slot />
</main>

<footer class="fixed z-10 inset-x-0 bottom-0 text-right">
	<span class="inline-block">🏎️</span>
</footer>

<style>
	main::before,
	main::after {
		@apply pointer-events-none block sticky h-24 from-black to-transparent;
	}

	main::before {
		@apply bg-gradient-to-b;
	}

	main::after {
		@apply bg-gradient-to-t;
	}

	footer {
		display: none;
	}

	@supports (scroll-timeline: --scroll-timeline) {
		:global(html) {
			scroll-timeline: --scroll-timeline y;
			scroll-timeline: --scroll-timeline vertical;
		}

		footer {
			display: block;
			animation: animate 1ms linear;
			animation-timeline: --scroll-timeline;
		}
	}

	@keyframes animate {
		to {
			translate: calc(1rem - 100vw) 0;
		}
	}
</style>

<script>
	import '../styles/app.css'
</script>
