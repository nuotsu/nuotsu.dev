<ul class="sticky bottom-0 flex gap-3 items-start">
	<li><a href="https://github.com/nuotsu">GitHub</a></li>
	<li><a href="https://linked.com/in/nuotsu">LinkedIn</a></li>
	<li><a href="mailto:mitchell@nuotsu.dev">Email</a></li>
</ul>

<style>
	ul {
		writing-mode: vertical-rl;

		@supports (writing-mode: sideways-rl) {
			writing-mode: sideways-lr;
		}

		@supports not (writing-mode: sideways-rl) {
			scale: -1;
		}
	}

	a {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25em;

		&::after {
			content: '☝️';
		}

		&:not(:hover)::after {
			visibility: hidden;
		}
	}
</style>
