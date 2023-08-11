<header>
	<h1>Mitchell Kazumaru Christ</h1>
	<p><em>nuotsu</em></p>
</header>

<section>
	<h2>Frontend Web Dev</h2>
	<ul>
		<li>SvelteKit</li>
		<li>Next.js</li>
		<li>TypeScript</li>
		<li>Tailwind</li>
		<li>Shopify<a class="link" href="https://www.credly.com/badges/714964a0-6bbb-4da8-9c02-e91b005fc967/linked_in_profile">🎖️</a></li>
		<li>Sanity</li>
	</ul>
</section>

<section>
	<h2>Contact</h2>
	<ul>
		<li><a class="link" href="https://github.com/nuotsu">GitHub</a></li>
		<li><a class="link" href="https://linkedin.com/in/nuotsu">LinkedIn</a></li>
	</ul>
</section>

<style>
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0 1em;
	}
</style>

{@html schema(person)}

<script lang="ts">
	import schema from '$lib/schema'
	import type { WithContext, Person } from 'schema-dts'

	const person: WithContext<Person> = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Mitchell Christ',
		additionalName: 'Kazumaru',
		alternateName: 'nuotsu',
		jobTitle: 'Frontend Web Dev',
		url: 'https://nuotsu.dev',
		sameAs: [
			'https://github.com/nuotsu',
			'https://linkedin.com/in/nuotsu',
		],
	}
</script>
