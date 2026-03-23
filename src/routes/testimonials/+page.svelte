<script lang="ts">
	import { testimonials } from '$lib/constants'
</script>

<section class="section">
	<h2 class="sr-only">Testimonials</h2>

	<div class="grid gap-[1.5lh]">
		{#each testimonials as testimonial}
			<figure class="relative grid max-w-max items-end gap-[.5ch]">
				<figcaption style:grid-area="caption">
					<cite class="text-xs not-italic">
						<a class="flex flex-wrap gap-x-ch pl-[1.5rch]" href={testimonial.source}>
							<span>{testimonial.author.name}</span>
							<i class="text-subdued">{testimonial.author.title}</i>
							<span class="absolute inset-0 z-1 text-[0px]">{testimonial.source}</span>
						</a>
					</cite>
				</figcaption>

				<blockquote
					class="flex flex-col items-start gap-[.3ch] leading-tight"
					style:grid-area="quote"
				>
					{#each testimonial.quote as quote}
						<p
							class="max-w-fit rounded-[1lh] bg-foreground/10 px-[1.5ch] py-ch has-[+p]:rounded-bl [&+&]:rounded-tl"
						>
							{@html quote}
						</p>
					{/each}
				</blockquote>

				<div
					class="sticky bottom-[max(1ch,env(safe-area-inset-bottom))] my-[.25ch] overflow-hidden rounded-full bg-linear-to-b from-subdued/50 to-foreground/10 *:size-[calc(1lh+1ch)]"
					style:grid-area="avatar"
				>
					{#if testimonial.author.avatar}
						<img
							class="object-cover"
							src={testimonial.author.avatar}
							alt={testimonial.author.name}
							loading="lazy"
							draggable="false"
						/>
					{:else}
						<b class="grid place-content-center">{testimonial.author.name.slice(0, 1)}</b>
					{/if}
				</div>
			</figure>
		{/each}
	</div>
</section>

<style>
	figure {
		grid-template:
			'avatar caption' auto
			'avatar quote' auto / auto 1fr;
	}
</style>
