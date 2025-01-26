<header class="sticky top-0 max-w-max">
	<h1 class="flex items-center">
		<a href="/">nuotsu</a>
	</h1>
</header>

<style>
	@media (width < 64rem) and (orientation: landscape) {
		header {
			top: calc(100dvh - 100svh);
			height: 0;
			margin-bottom: -1ch;

			&::before {
				content: '(^o^)/';
				position: absolute;
				bottom: 0;
				right: 0;
				color: var(--color-accent);
				text-align: right;
			}
		}
	}

	h1::before {
		content: '|';
		color: var(--color-accent);
		font-size: large;
		line-height: 0;
		margin-left: -0.25ch;
	}
</style>
