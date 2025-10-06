<script lang="ts">
	import Img from './img.svelte'
	import type { Global } from '@/sanity/types'

	let { teams = [] }: { teams: Global['pokemonTeams'] } = $props()
</script>

<ul
	class="-mt-lh no-scrollbar flex overflow-x-auto mask-r-from-[calc(100%-1ch)] max-md:full-bleed max-md:px-ch max-sm:justify-between"
>
	{#each teams as team}
		<li class="ml-[-2ch] shrink-0">
			<figure class="flex min-h-[5lh] items-end saturate-150">
				{#each team?.pokemon ?? [] as pokemon, i}
					{#if pokemon?.asset}
						<Img
							class="
								relative h-[4lh] w-auto shrink-0 transition-[all] not-first:ml-[-4ch]
								hover:z-1 hover:mr-[.5ch] hover:h-[5lh] hover:not-first:ml-[-4ch]
							"
							image={pokemon}
							alt={pokemon.alt}
							draggable={false}
						/>
					{/if}
				{/each}
			</figure>
		</li>
	{/each}
</ul>

<style>
	li :global(img) {
		image-rendering: -moz-crisp-edges;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: pixelated;
	}

	li:has(:global(img:hover)) :global(img:not(:hover)) {
		opacity: 0.5;
		filter: blur(1px);
	}
</style>
