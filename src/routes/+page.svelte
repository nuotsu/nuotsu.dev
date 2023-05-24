<div class="flex flex-wrap items-center justify-center gap-8">
	<FrequencyViz controls={false}
		svgClassName="mx-auto"
		fftSizeIndex={4}
		minDecibels={-480}
		offset={-150}
		height={100}
	/>

	<TimeDomainViz controls={false}
		svgClassName="mx-auto"
		fftSizeIndex={4}
		height={100}
	/>
</div>

<div class="grid">
	<Section title="Skills">
		<ul class="flex flex-wrap items-center justify-center gap-[.5ch]">
			{#each skills as skill, i}
				{#if i > 0}
					<span class="OR">||</span>
				{/if}
				<li>{skill}</li>
			{/each}
		</ul>
	</Section>

	<Section title="Contact" className="text-center">
		<nav>
			<a class="link" href="https://github.com/nuotsu">GitHub</a>
			<span class="OR">||</span>
			<a class="link" href="https://linkedin.com/in/nuotsu">LinkedIn</a>
			<span class="OR">||</span>
			<a class="link" href="mailto:xzmaru@gmail.com">Email</a>
		</nav>
	</Section>

	<Section title="Motivation" className="grid gap-6 text-center">
		<Quote>A day without failure is a day without learning.</Quote>

		<Quote author="Rich Harris" cite="https://youtu.be/uXCipjbcQfM?t=270">
			Lighthouse is a <em>diagnostic tool</em>, not a <em>scorecard</em>.
		</Quote>
	</Section>
</div>

<script>
	import FrequencyViz from '$lib/audio/FrequencyViz.svelte'
	import TimeDomainViz from '$lib/audio/TimeDomainViz.svelte'
	import Section from '$lib/Section.svelte'
	import Quote from '$lib/Quote.svelte'

	const skills = [
		'SvelteKit',
		'Next.js / React',
		'TypeScript',
		'Tailwind',
		'Vercel / Netlify',
		'Sanity',
	]
</script>
