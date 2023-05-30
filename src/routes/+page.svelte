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

	<Section title="Motivation" className="text-center [&>*]:mx-auto">
		<Quote author="">Think different.</Quote>
		<Quote>A day without failure is a day without learning.</Quote>
		<Quote code>const goodCode = "self-documenting"</Quote>
	</Section>

	<figure class="max-w-screen-xl mx-auto mt-12">
		<img
			src="/images/edo-macbook.webp"
			alt="Citizens of Edo typing on a MacBook, traditional Japanese wood block print by Hokusai"
			width={1600} height={686}
			loading="lazy"
			draggable={false}
		>
	</figure>
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
