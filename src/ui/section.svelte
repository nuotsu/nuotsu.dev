<script lang="ts">
	import type { Snippet } from 'svelte'
	import { cn } from '#lib/utils.ts'
	import Scramble from '#ui/scramble.svelte'

	let {
		title,
		class: className,
		children
	}: {
		title?: string
		class?: string
		children: Snippet
	} = $props()

	const binary = $derived(
		(title &&
			Array.from(new TextEncoder().encode(title), (byte) => byte.toString(2).padStart(8, '0'))
				.join('')
				.slice(0, 16)) ??
			''
	)
</script>

<section class={cn('relative mx-auto w-full', className)}>
	{#if title}
		<Scramble
			class="absolute top-0 right-[calc(100%-1rlh)] block w-[2lh] font-numeric text-[.5em] break-all opacity-30 select-none"
			text={binary}
			chars="01"
			trigger={['view', 'hover']}
		/>

		<h2 class="col-span-full mb-[.5rch] text-[.7em] uppercase">{title}</h2>
	{/if}

	{@render children()}
</section>

<style>
	section {
		padding-inline: calc(1lh + 0.5ch) 1lh;
	}
</style>
