<script lang="ts">
	import Img from './img.svelte'
	import type { Global } from '@/sanity/types'

	const { cars = [] }: { cars: Global['cars'] } = $props()
</script>

<dl
	class="no-scrollbar flex gap-lh overflow-x-auto overflow-y-clip mask-r-from-[calc(100%-1ch)] max-md:full-bleed max-md:px-ch md:pr-ch"
	style:--gap="3.5ch"
>
	{#each cars as car, index}
		<dt
			class="sticky left-0 shrink-0 bg-background text-right before:bg-linear-to-l before:from-background before:via-background"
		>
			{@html car.alt?.replace(/\n/g, '<br>')}
		</dt>
		<dd
			class="sticky ml-[-2ch] shrink-0 last:bg-linear-to-r last:from-transparent last:to-background"
			style:z-index={cars.length - index}
			style:right="calc((-1ch - var(--gap)) + ({cars.length - index} * var(--gap)))"
		>
			<Img
				class="h-[2lh] w-auto"
				image={car}
				height={100}
				alt={car.alt}
				draggable={false}
			/>
		</dd>
	{/each}
</dl>

<style>
	dt {
		&::before {
			content: '';
			position: absolute;
			inset-block: 0;
			right: 100%;
			width: 100%;
		}

		&::after {
			content: '';
			position: absolute;
			inset-block: 0;
			inset-inline: calc(-1ch - 1px) -3ch;
			z-index: -1;
			background-color: var(--color-background);
		}
	}

	dd {
		filter: drop-shadow(-1ch 0 1ch var(--color-background))
			drop-shadow(
				1ch 0 1ch color-mix(in srgb, var(--color-background) 50%, transparent)
			);
	}
</style>
