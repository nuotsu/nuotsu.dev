<script lang="ts">
	import { links } from '$lib/constants'
	import Headline from '$ui/headline.svelte'
	import SourceCode from '$ui/source-code.svelte'
</script>

<section>
	<Headline>Contact</Headline>

	<ul class="grid grid-cols-2 text-center">
		{#each links as { label, href }}
			<li>
				<a class="line-clamp-1 break-all" {href}>{label}</a>
			</li>
		{/each}
	</ul>

	<SourceCode file="src/ui/sections/contact.svelte" lines={6} />
</section>
