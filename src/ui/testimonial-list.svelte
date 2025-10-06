<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import type { Testimonial } from '@/sanity/types'

	let { testimonials = [] }: { testimonials: Testimonial[] } = $props()
</script>

<ul
	class="carousel no-scrollbar items-stretch gap-ch mask-r-from-[calc(100%-1ch)] pt-[.5ch] max-md:full-bleed max-md:px-ch"
>
	{#each testimonials as testimonial}
		<li
			class="relative flex flex-col gap-y-ch border-l border-green-400 bg-green-400/10 p-[.5ch] last:mr-[.5ch] hover:bg-green-400/20"
		>
			<blockquote>
				<PortableText value={testimonial.quote} />
			</blockquote>
			<cite class="mt-auto">
				<div class="flex flex-wrap gap-x-ch">
					<dt>{testimonial.author}</dt>

					{#if testimonial.title}
						<dd class="flex gap-x-ch text-balance before:content-['//']">
							{testimonial.title}
						</dd>
					{/if}

					{#if testimonial.source}
						<dd class="text-green-400">
							<a href={testimonial.source}>
								<span class="sr-only">Source</span>
								<span class="absolute inset-0"></span>
							</a>
						</dd>
					{/if}
				</div>
			</cite>
		</li>
	{/each}
</ul>

<style>
	li {
		& :global(em) {
			color: var(--color-green-400);
		}

		&::before,
		&::after {
			position: absolute;
			line-height: 0.5lh;
			color: var(--color-green-400);
		}

		&::before {
			content: '“';
			left: 0.5ch;
			top: 0;
		}

		&::after {
			content: '”';
			right: 0.5ch;
			bottom: 0;
		}
	}
</style>
