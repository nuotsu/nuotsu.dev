<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { HTMLAttributes } from 'svelte/elements'

	let {
		heading,
		children,
		...props
	}: {
		heading: string
		children: Snippet
	} & HTMLAttributes<HTMLElement> = $props()
</script>

<section {...props}>
	{#if heading}
		<h2 class="mb-ch flex gap-0.5 border-b pb-[.5ch]">
			<svg width="1lh" height="1lh" viewBox="0 0 4 4" class="fill-amber-400">
				<circle cx="2" cy="2" r="1" />
			</svg>
			{heading}
		</h2>
	{/if}

	{@render children()}
</section>
