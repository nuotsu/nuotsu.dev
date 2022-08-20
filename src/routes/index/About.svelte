<Section title="About">
	<ul>
		{#each links as { href, label }}
			{@const active = href === $page.url.pathname}
			{@const external = href.startsWith('http')}

			<li>
				<a class="link" {href} target={external ? '_blank' : null}>
					{label}
				</a>
				{#if active}<span class="is-active" />{/if}
			</li>
		{/each}
	</ul>
</Section>

<script>
	import Section from '$lib/Section.svelte'
	import { page } from '$app/stores'

	console.log($page)

	const links = [
		{ href: '/bio', label: 'Bio' },
		{ href: '/skills', label: 'Skills' },
		{ href: 'https://github.com/nuotsu', label: 'GitHub' },
		{ href: 'https://linkedin.com/in/nuotsu', label: 'LinkedIn' },
	]
</script>
