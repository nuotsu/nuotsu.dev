<main class="before:block after:block">
	<slot />
</main>

<footer class="fixed z-10 inset-x-0 bottom-0 text-right">
	<span class="inline-block">🏎️</span>
</footer>

<style>
	main::before,
	main::after {
		@apply pointer-events-none sticky h-24 from-black to-transparent;
	}

	main::before {
		@apply top-0 bg-gradient-to-b;
	}

	main::after {
		@apply bottom-0 bg-gradient-to-t;
	}

	:global(html) {
		scroll-timeline: --scroll-timeline y;
		scroll-timeline: --scroll-timeline vertical;
	}

	footer {
		animation-name: animate;
		animation-duration: 1ms;
		animation-timeline: --scroll-timeline;
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
