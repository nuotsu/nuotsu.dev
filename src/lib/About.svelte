<section class="flex items-start gap-x-[1ch] px-[1ch]">
	<h2 class="sticky-header shrink-0 grow font-normal">About</h2>

	<div class="max-w-lg sm:text-justify">
		<PortableText value={site.about} components={{}} />
	</div>
</section>

<style>
	div :global(a) {
		text-decoration: underline;
		text-decoration-style: dotted;

		&:hover {
			text-decoration: none;
			background: var(--color-ink);
			color: var(--color-canvas);
		}
	}
</style>

<script lang="ts">
	import { PortableText } from '@portabletext/svelte'

	let { site }: { site: Sanity.Site } = $props()
</script>
