<script lang="ts">
	import Section from './section.svelte'
	import { intersecting } from '$lib/intersection-observer'
</script>

<Section id="testimonials" class="space-y-[3lh] overflow-x-clip">
	<h2 class="sr-only">Testimonials</h2>

	{@render testimonial(
		"This is sick dude. [...] Love seeing all the <strong>great work</strong> you're doing for <strong>the Sanity Community</strong>.",
		'Jono',
		'Founder of Roboto Studio',
		'https://github.com/nuotsu/sanitypress/discussions/65#discussioncomment-12237198',
	)}
	{@render testimonial(
		'A really cool Sanity + Next.js starter template. Go check it out! 🔥 <strong>Really great work</strong>, Mitchell.',
		'Kapehe',
		'Head of Developer Community @ Vercel',
		'https://www.sanity.io/blog/community-digest-may-24-edition#84fd322ef040',
	)}
	{@render testimonial(
		"Dude, Mitchell's a <strong><em>crazy</em> dev</strong> 🤯. Check out his <strong>MLB app</strong>.",
		'Shota',
		'Senior Software Engineer @ Salesforce',
		'https://sb3.theohtani.com',
	)}
</Section>

{#snippet testimonial(
	quote: string,
	author: string,
	title: string,
	source: string,
)}
	<figure
		class="relative space-y-4 not-data-is-intersecting:[&_strong]:font-normal data-is-intersecting:[&_strong]:text-shadow-lg"
		{@attach intersecting({ 'data-is-intersecting': true }, { threshold: 1 })}
	>
		<blockquote class="h2">
			<p>
				{@html quote}
			</p>
		</blockquote>

		<figcaption>
			<dl class="gap-x-ch">
				<dt>{author}</dt>
				<dd class="text-foreground-subdued">{title}</dd>
			</dl>
			<cite>
				<a class="absolute inset-0 text-transparent" href={source}>Source</a>
			</cite>
		</figcaption>
	</figure>
{/snippet}

<style>
	figure {
		animation: appear ease-in-out;
		animation-timeline: view();

		& :global(strong) {
			transition:
				font-weight 0.8s ease-in-out,
				text-shadow 0.8s ease-in-out;
		}
	}

	@keyframes appear {
		0% {
			opacity: 0;
			translate: 4lh 0;
		}

		50% {
			opacity: 1;
			translate: 0 0;
		}
	}

	dd::before {
		content: '// ';
	}
</style>
