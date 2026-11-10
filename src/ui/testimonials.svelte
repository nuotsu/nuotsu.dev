<script lang="ts">
	const TESTIMONIALS: {
		quote: string[]
		author: string
		source?: string
	}[] = [
		{
			quote: [
				'This is sick dude.',
				'Love seeing all the <a href="https://www.sanity.io/exchange/community/nuotsu">great work</a> you\'re doing for the Sanity Community.'
			],
			author: 'Jono, Founder of Roboto Studio',
			source: 'https://github.com/nuotsu/sanitypress-2023/discussions/65#discussioncomment-12237198'
		},
		{
			quote: [
				'A really cool Sanity + Next.js starter template.',
				'Go check it out! 🔥',
				'<a href="https://sanitypress.dev">Really great work</a>, Mitchell.'
			],
			author: 'Kapehe, Head of Developer Community @ Vercel',
			source: 'https://www.sanity.io/blog/community-digest-may-24-edition#84fd322ef040'
		},
		{
			quote: [
				"Dude, Mitchell's a <em>crazy</em> dev 🤯",
				'Check out his <a href="https://mlb.theohtani.com">MLB app</a>.'
			],
			author: 'Shota, Senior Software Engineer @ Salesforce'
		}
	]
</script>

<section class="section">
	<div class="grid grid-cols-[auto_1fr] gap-lh">
		{#each TESTIMONIALS as { quote, author, source }}
			{@const [name, title] = author.split(',')}

			<figure
				class="group/testimonial col-span-full grid grid-cols-subgrid items-start gap-y-[.5ch]"
			>
				<blockquote
					class="order-last space-y-[.5ch] text-cp-cyan [&_a]:transition-colors [&_a:hover]:text-glow"
				>
					{#each quote as line}
						<p>{@html line}</p>
					{/each}
				</blockquote>

				<cite class="contents not-italic">
					<strong class="ml-auto bevel-bl uppercase group-hover/testimonial:text-glow">
						{name}:
					</strong>

					{#if title}
						<small
							class="relative order-first col-span-full max-w-max bevel-tl text-[.7em] {source
								? 'button hover:text-cp-amber'
								: 'bevel'}"
						>
							{title}

							{#if source}
								<a href={source} class="absolute inset-0 text-transparent">
									{source}
								</a>
							{/if}
						</small>
					{/if}
				</cite>
			</figure>
		{/each}
	</div>
</section>

<style>
	blockquote :global(a) {
		text-decoration: 0.5px underline;
		text-underline-offset: 2px;
		font-weight: 700;

		&:hover {
			color: var(--color-cp-amber);
		}
	}
</style>
