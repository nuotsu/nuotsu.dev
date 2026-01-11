<script lang="ts">
	import { archive } from '$lib/constants'
	import Headline from '$ui/headline.svelte'
	import SourceCode from '$ui/source-code.svelte'
</script>

<section>
	<Headline>Archive</Headline>

	<ol class="grid text-center tabular-nums">
		{#each archive as { date, href }}
			<li>
				<a class="block" {href}>
					<time datetime={date}>{date}</time>
				</a>
			</li>
		{/each}
	</ol>

	<SourceCode file="src/ui/sections/archive.svelte" lines={4} />
</section>

<style>
	ol {
		grid-template-columns: repeat(auto-fill, minmax(9ch, 1fr));
	}
</style>
