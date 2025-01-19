<header class="sticky top-0">
	<h1 class="flex items-center">nuotsu</h1>
</header>

<style>
	@media (orientation: landscape) {
		header {
			top: calc(100dvh - 100svh);
		}
	}

	h1::before {
		content: '|';
		color: orangered;
		font-size: large;
		margin-left: -0.25ch;
	}
</style>
