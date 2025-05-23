<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>

<article class="space-y-ch max-w-prose">
	<PortableText value={data.site?.about} />
</article>

<style>
	article > :global(:first-child:first-letter) {
		font-size: xx-large;
		line-height: 1;
	}
</style>
