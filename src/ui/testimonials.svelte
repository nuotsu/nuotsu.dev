<script lang="ts">
	import { createLinkPreview } from '#lib/link-preview.svelte.ts'
	import { cn } from '#lib/utils.ts'
	import Section from '#ui/section.svelte'
	import LinkOutput from '#ui/link-output.svelte'

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

	const preview = createLinkPreview()
</script>

<Section title="Testimonials" class="group/root text-cp-cyan md:col-span-3!">
	<div class="grid grid-cols-[auto_1fr] gap-lh">
		{#each TESTIMONIALS as { quote, author, source }}
			{@const [name, title] = author.split(',')}

			<figure class="group/t col-span-full grid grid-cols-subgrid items-start gap-y-[.5ch]">
				<blockquote class="order-last space-y-[.5lh] [&_a]:link-underline">
					{#each quote as line}
						<p>{@html line}</p>
					{/each}
				</blockquote>

				<cite class="contents text-cp-red not-italic">
					<strong
						class="ml-auto bevel-bl uppercase transition-opacity group-hover/root:group-not-hover/t:opacity-60 group-hover/t:text-glow"
					>
						{name}:
					</strong>

					{#if title}
						<small
							class={cn(
								'relative order-first col-span-full max-w-max bevel-tl text-[.7em]',
								source
									? 'button transition-[background-color,color] hover:bg-cp-amber hover:text-background'
									: 'bevel'
							)}
						>
							{title}

							{#if source}
								<a
									href={source}
									class="absolute inset-0 z-1 text-transparent"
									{@attach preview.attach}
								>
									{source}
								</a>
							{/if}
						</small>
					{/if}
				</cite>
			</figure>
		{/each}
	</div>

	<LinkOutput {preview} stagger={12} />
</Section>

<style>
	blockquote :global(a) {
		text-decoration: 0.5px underline;
		text-underline-offset: 2px;
		font-weight: bold;

		&:is(:hover, :focus-visible) {
			color: var(--color-cp-amber);
		}
	}
</style>
