<script lang="ts">
	import Section from './section.svelte'

	const inspiration = {
		People: {
			'Adam Wathan': 'https://x.com/adamwathan',
			'Ana Tudor': 'https://x.com/anatudor',
			DHH: 'https://x.com/dhh',
			'Theo Browne': 'https://www.youtube.com/@t3dotgg',
			'Shohei Ohtani': 'https://www.instagram.com/shoheiohtani',
		},
		Sites: {
			"Shopify Editions Winter '26":
				'https://www.shopify.com/editions/winter2026',
			'Lorenzo Dossi': 'https://www.lorenzodossi.com',
			'Olha Lazarieva': 'https://www.olhalazarieva.com',
			'Tomoya Okada': 'https://tomoyaokada.com/case',
		},
	}
</script>

<Section
	id="inspiration"
	heading="Inspiration"
	class="prose"
	inspect="src/ui/sections/inspiration.svelte"
>
	<div class="grid gap-2">
		{#each Object.entries(inspiration) as [category, items]}
			<h3 class="col-span-full mb-ch font-serif h4">{category}</h3>

			<ul class="mb-lh">
				{#each Object.entries(items) as [name, value]}
					<li class="text-foreground-subdued">
						<a href={value}>{name}</a>
					</li>
				{/each}
			</ul>
		{/each}
	</div>
</Section>
