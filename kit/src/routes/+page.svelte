<main class="text-ink flex min-h-svh flex-col before:h-12">
	<section class="mx-auto mt-auto flex w-full max-w-sm flex-col-reverse">
		<h1 class="panel-green text-ink font-shadow-ink text-xl">
			Welcome to nuotsu.dev!
		</h1>

		<nav class="panel-white text-ink font-shadow-ink ml-auto max-w-max text-xl">
			<a href="/projects">Projects</a>
		</nav>
	</section>
</main>

<style>
	:global(body) {
		background: #000;
	}

	main::before {
		content: '';
		position: sticky;
		top: 0;
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
</style>
