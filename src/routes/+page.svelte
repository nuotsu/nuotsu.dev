<div class="text-center">
	<h1>Mitchell Kazumaru Christ / nuotsu</h1>

	<FrequencyData
		svgClassName="mx-auto"
		fftSizeIndex={5}
		minDecibels={-250}
		offset={-45}
		height={200}
	/>

	<ul>
		{#each skills as skill}
			<li>{skill}</li>
		{/each}
	</ul>

	<ul>
		<li><a href="https://github.com/nuotsu">GitHub</a></li>
		<li><a href="https://linkedin.com/in/nuotsu">LinkedIn</a></li>
		<li><a href="mailto:xzmaru@gmail.com">Email</a></li>
	</ul>
</div>

<script>
	import FrequencyData from "$lib/FrequencyData.svelte"

	const skills = [
		'Next.js',
		'SvelteKit',
		'React',
		'Tailwind',
		'Sanity',
		'Shopify',
		'Vercel',
		'Netlify',
	]
</script>
