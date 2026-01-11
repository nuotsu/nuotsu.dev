<script lang="ts">
	import { testimonials } from '$lib/constants'
	import Headline from '$ui/headline.svelte'
	import SourceCode from '$ui/source-code.svelte'
</script>

<section>
	<Headline>Testimonials</Headline>

	<div class="grid gap-ch">
		{#each testimonials as { quote, author, source }}
			<figure class="group relative grid">
				<blockquote class="text-pretty group-hover:bg-current/10">
					{@html quote}
				</blockquote>

				<figcaption class="inline-flex text-[small] text-current/50">
					<dl class="flex flex-wrap gap-x-[.5ch]">
						<dt>{author.name},</dt>
						<dd>{author.title}</dd>
					</dl>

					<cite>
						<a class="absolute inset-0 text-transparent" href={source}>
							Source
						</a>
					</cite>
				</figcaption>
			</figure>
		{/each}
	</div>

	<SourceCode file="src/ui/sections/testimonials.svelte" lines={15} />
</section>
