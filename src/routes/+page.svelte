<div class="grid grid-cols-1 gap-4 text-center">
	<FrequencyViz controls={false}
		svgClassName="mx-auto"
		fftSizeIndex={4}
		minDecibels={-480}
		offset={-150}
		height={100}
	/>

	<ul class="flex flex-wrap items-center justify-center gap-[.5ch]">
		{#each skills as skill, i}
			{#if i > 0}
				<span class="OR">||</span>
			{/if}
			<li>{skill}</li>
		{/each}
	</ul>

	<TimeDomainViz controls={false}
		svgClassName="mx-auto"
		fftSizeIndex={4}
		height={100}
	/>

	<nav>
		<a class="link" href="https://github.com/nuotsu">GitHub</a>
		<span class="OR">||</span>
		<a class="link" href="https://linkedin.com/in/nuotsu">LinkedIn</a>
		<span class="OR">||</span>
		<a class="link" href="mailto:xzmaru@gmail.com">Email</a>
	</nav>
</div>

<script>
	import FrequencyViz from '$lib/FrequencyViz.svelte'
	import TimeDomainViz from '$lib/TimeDomainViz.svelte'

	const skills = [
		'SvelteKit',
		'Next.js / React',
		'Tailwind',
		'Sanity',
		'Shopify',
		'Vercel',
		'Netlify',
	]
</script>
