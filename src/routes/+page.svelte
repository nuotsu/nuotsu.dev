<Viz/>

<div class="grid">
	<Section title="Skills">
		<ul class="flex flex-wrap items-center sm:justify-center gap-[.5ch]">
			{#each skills as skill, i}
				{#if i > 0}
					<span class="OR">||</span>
				{/if}
				<li>{skill}</li>
			{/each}
		</ul>
	</Section>

	<Section title="Links" className="<sm:w-full sm:text-center">
		<nav>
			<a class="link" href="https://github.com/nuotsu">GitHub</a>
			<span class="OR">||</span>
			<a class="link" href="https://linkedin.com/in/nuotsu">LinkedIn</a>
			<span class="OR">||</span>
			<a class="link" href="mailto:xzmaru@gmail.com">Email</a>
		</nav>
	</Section>

	<Section title="Motivation" className="text-center">
		<Quote>A day without failure is a day without learning.</Quote>
	</Section>
</div>

<script>
	import Viz from '$lib/Viz.svelte'
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
