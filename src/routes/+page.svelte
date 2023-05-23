<div class="grid grid-cols-1 gap-4 text-center">
	<FrequencyData
		svgClassName="mx-auto"
		fftSizeIndex={4}
		minDecibels={-400}
		offset={-150}
		height={100}
	/>

	<ul>
		{#each skills as skill}
			<li>{skill}</li>
		{/each}
	</ul>

	<nav>
		<a class="link" href="https://github.com/nuotsu">GitHub</a> ᐧ
		<a class="link" href="https://linkedin.com/in/nuotsu">LinkedIn</a> ᐧ
		<a class="link" href="mailto:xzmaru@gmail.com">Email</a>
	</nav>
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
