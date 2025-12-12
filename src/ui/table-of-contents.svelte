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

<ol
	id="table-of-contents"
	class="whitespace-nowrap [&_a]:transition-[opacity,color] scrolled:[&_a]:opacity-50"
>
	{#each sections as section}
		<li>
			<a
				class="after:text-foreground-subdued hover:opacity-100! at-bottom:after:text-white/50"
				href={`#${section.id}`}>{section.title}</a
			>
		</li>
	{/each}
</ol>

<style>
	ol:has(a:hover) a:is(:not(:hover), :global(.is-active)) {
		opacity: 0.5;
	}

	li {
		counter-increment: item;
		display: grid;
		grid-template-columns: subgrid;

		&:has(:global(.is-active)):not(:has(:global(.is-active)) ~ &)
			:global(.is-active) {
			opacity: 1;

			&::before {
				content: '';
				clip-path: inset(0);
			}
		}
	}

	a {
		display: flex;
		align-items: center;
		gap: 1ch;

		&::before {
			content: '';
			clip-path: inset(0 100% 0 0);
			background-image: linear-gradient(
				270deg,
				currentColor 1px,
				transparent 1px
			);
			background-position: 50%;
			background-repeat: repeat-x;
			background-size: 3px 30%;
			width: 100%;
			height: 2px;
			order: 1;
			flex-grow: 1;
			transition: clip-path 0.2s ease-in-out;
		}

		&::after {
			content: counter(item, upper-roman);
			order: 2;
			margin-left: auto;
			font-family: var(--font-serif);
		}
	}
</style>
