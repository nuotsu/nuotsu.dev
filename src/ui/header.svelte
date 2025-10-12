<script lang="ts">
	let { tagline }: { tagline?: string } = $props()
</script>

<hgroup>
	<h1>
		Mitchell Christ
		<a href="https://github.com/nuotsu" class="inline-block font-normal">
			@ nuotsu
		</a>
	</h1>
	<h2 class="before:content-['//_']">{tagline}</h2>
</hgroup>

<style>
	@property --y {
		syntax: '<percentage>';
		inherits: false;
		initial-value: 0%;
	}

	a {
		background-image: linear-gradient(
			to top,
			var(--color-blue-500) var(--y),
			transparent var(--y),
			transparent
		);
		transition: --y 0.1s ease-in-out;

		&:hover {
			--y: 100%;
		}
	}
</style>
