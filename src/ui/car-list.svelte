<script lang="ts">
	import Img from './img.svelte'
	import type { Global } from '@/sanity/types'

	const { cars = [] }: { cars: Global['cars'] } = $props()
</script>

<dl
	class="full-bleed no-scrollbar flex gap-ch overflow-x-auto overflow-y-clip px-ch"
>
	{#each cars as car}
		<dt class="sticky left-0 shrink-0 bg-background text-right">
			{@html car.alt?.replace(/\n/g, '<br>')}
		</dt>
		<dd class="relative shrink-0 bg-linear-to-l from-background to-transparent">
			<Img class="h-[2lh] w-auto" image={car} height={100} alt={car.alt} />
		</dd>
	{/each}
</dl>

<style>
	dt::after {
		content: '';
		position: absolute;
		inset-block: 0;
		inset-inline: calc(-1ch - 1px) -3ch;
		z-index: -1;
		background-color: var(--color-background);
	}

	dd {
		filter: drop-shadow(-1ch 0 1ch var(--color-background));
	}
</style>
