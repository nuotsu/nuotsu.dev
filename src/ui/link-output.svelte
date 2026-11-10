<script lang="ts">
	import type { LinkPreview } from '#lib/link-preview.svelte.ts'
	import Scramble from '#ui/scramble.svelte'

	let {
		preview,
		stagger = 30,
		class: className = ''
	}: {
		preview: LinkPreview
		stagger?: number
		class?: string
	} = $props()
</script>

<output class="mt-[.5rch] block h-rlh border-t-sm pt-[.25ch] text-[.75em] break-all {className}">
	{#key preview.url}
		<Scramble class="line-clamp-1" trigger="load" text={preview.url} {stagger} delay={100} />
	{/key}
</output>
