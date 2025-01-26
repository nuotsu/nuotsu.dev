<header class="sticky top-0">
	<h1 class="flex items-center">
		<a href="/">nuotsu</a>
	</h1>
</header>

<style>
	@media (orientation: landscape) {
		header {
			top: calc(100dvh - 100svh);
		}
	}

	h1::before {
		content: '|';
		color: var(--color-accent);
		font-size: large;
		margin-left: -0.25ch;
	}
</style>
