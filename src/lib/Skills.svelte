<section class="p-4">
	<ul class="flex flex-wrap gap-x-4 gap-y-2 justify-center">
		{#each skills as skill}
			<li class="transition-all">{skill}</li>
		{/each}
	</ul>
</section>

<style>
	li:hover {
		color: var(--accent);
		font-weight: 900;
	}
</style>

<script>
	const skills = [
		'Next.js',
		'SvelteKit',
		'React',
		'Tailwind',
		'Sanity',
		'Shopify',
		'Netlify',
		'Vercel',
	]
</script>
