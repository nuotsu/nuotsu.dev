<ul class="sticky bottom-0 flex gap-3 items-start">
	{#each links as link}
		<li>
			<a href={link.href}>
				{link.text}
			</a>
		</li>
	{/each}
</ul>

<style>
	ul {
		writing-mode: vertical-rl;

		@supports (writing-mode: sideways-rl) {
			writing-mode: sideways-lr;
		}

		@supports not (writing-mode: sideways-rl) {
			scale: -1;
		}
	}

	a {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25em;

		&:hover {
			font-style: italic;
		}
	}
</style>

<script lang="ts">
	import Japanese from './Japanese.svelte'

	const links: {
		href: string
		text: string
	}[] = [
		{ href: 'https://github.com/nuotsu', text: 'GitHub' },
		{ href: 'https://linkedin.com/in/nuotsu', text: 'LinkedIn' },
		{ href: 'mailto:mitchell@nuotsu.dev', text: 'Email' },
	]
</script>
