<nav class="flex flex-wrap gap-4 justify-center p-2">
	{#each links as { label, href }}
		<a {href} target="_blank" rel="noopener noreferrer">
			{label}
		</a>
	{/each}
</nav>

<style>
	a:not(:hover) {
		opacity: .2;
	}
</style>

<script>
	const links = [
		{ label: 'GitHub', href: 'https://github.com/nuotsu' },
		{ label: 'LinkedIn', href: 'https://linkedin.com/in/nuotsu' },
		{ label: 'Email', href: 'mailto:xzmaru@gmail.com' },
	]
</script>
