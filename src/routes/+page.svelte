<h1>Mitchell Kazumaru Christ / nuotsu</h1>

<AudioAnalyzer>
	<FrequencyData
		fftSizeIndex={6}
		minDecibels={-250}
		offset={-45}
		height={200}
	/>
</AudioAnalyzer>

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

<script>
	import AudioAnalyzer from "$lib/AudioAnalyzer.svelte"
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
