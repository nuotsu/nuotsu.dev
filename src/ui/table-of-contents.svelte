<script lang="ts">
	import { goto } from '$app/navigation'

	const sections = [
		{ id: 'abstract', title: 'Abstract' },
		{ id: 'notable-works', title: 'Notable Works' },
		{ id: 'projects', title: 'Projects' },
		{ id: 'writing', title: 'Writing' },
		{ id: 'testimonials', title: 'Testimonials' },
		{ id: 'domains', title: 'Domains' },
		{ id: 'gear', title: 'Gear' },
		{ id: 'about', title: 'About' },
		{ id: 'contact', title: 'Contact' },
	]
</script>

<svelte:window
	on:keydown={(e) => {
		if (!e.key.match(/^[0-9]$/)) return

		if (e.key === '0') goto('/')

		const section = sections[Number(e.key) - 1]
		if (section) window.location.hash = `#${section.id}`
	}}
/>

<ol class="[&_a]:transition-opacity">
	{#each sections as section}
		<li>
			<a
				class="transition-colors after:text-foreground-subdued at-bottom:after:text-white/50"
				href={`#${section.id}`}>{section.title}</a
			>
		</li>
	{/each}
</ol>

<style>
	ol:has(a:hover) a:not(:hover) {
		opacity: 0.5;
	}

	li {
		counter-increment: item;
		display: grid;
		grid-template-columns: subgrid;
	}

	a {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1ch;

		&::after {
			content: counter(item, upper-roman);
			font-family: var(--font-serif);
		}
	}
</style>
