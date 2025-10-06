<script lang="ts">
	let { tagline }: { tagline?: string } = $props()
</script>

<hgroup>
	<h1>
		Mitchell Christ
		<a
			href="https://github.com/nuotsu"
			class="inline-block font-normal hover:text-blue-300"
		>
			@ nuotsu
		</a>
	</h1>
	<h2 class="before:content-['//_']">{tagline}</h2>
</hgroup>
