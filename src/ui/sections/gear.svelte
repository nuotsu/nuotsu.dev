<script lang="ts">
	import Section from './section.svelte'

	const gear = {
		Software: {
			OS: 'macOS',
			Browser: 'Zen',
			Editor: 'Cursor',
			'AI Agent': 'Claude Code',
			'Image generation': 'Midjourney',
		},
		Libraries: {
			'Meta frameworks': 'Next.js, SvelteKit',
			CSS: 'Tailwind CSS',
			CMS: 'Sanity',
		},
		Hardware: {
			Keyboard:
				'MelGeek MOJO84|https://www.melgeek.com/products/melgeek-mojo84-plastic-advance-see-through-custom-programmable-mechanical-keyboard',
			'Daily driver': 'Toyota GR Supra 6MT',
			Pickleball: 'Joola Persius IV',
		},
	}
</script>

<Section
	id="gear"
	heading="Gear"
	class="space-y-rlh"
	inspect="src/ui/sections/gear.svelte"
>
	<div class="grid grid-cols-[auto_1fr] gap-x-lh gap-y-2">
		{#each Object.entries(gear) as [category, items]}
			<h3 class="col-span-full mb-ch font-serif h4">{category}</h3>

			<dl class="contents leading-tight">
				{#each Object.entries(items) as [name, value]}
					<dt class="text-foreground-subdued">{name}</dt>
					<dd class="last:mb-lh">
						{#if value.includes('|')}
							{@const [string, url] = value.split('|')}
							<a href={url}>{string}</a>
						{:else}
							{value}
						{/if}
					</dd>
				{/each}
			</dl>
		{/each}
	</div>
</Section>
