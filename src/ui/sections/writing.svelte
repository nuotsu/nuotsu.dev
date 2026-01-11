<script lang="ts">
	import { writing } from '$lib/constants'
	import Headline from '$ui/headline.svelte'
	import SourceCode from '$ui/source-code.svelte'
</script>

<section>
	<Headline>Writing</Headline>

	<ul>
		{#each writing as { title, href }}
			<li>
				<a class="line-clamp-1 break-all" {href}>{title}</a>
			</li>
		{/each}
	</ul>

	<SourceCode file="src/ui/sections/writing.svelte" lines={7} />
</section>
