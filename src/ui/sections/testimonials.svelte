<script lang="ts">
	import Headline from '$ui/headline.svelte'

	const testimonials: {
		quote: string
		author: {
			name: string
			title: string
		}
		source: string
	}[] = [
		{
			quote:
				"This is sick dude. [...] Love seeing all the <strong>great work</strong> you're doing for <strong>the Sanity Community</strong>.",
			author: {
				name: 'Jono',
				title: 'Founder of Roboto Studio',
			},
			source:
				'https://github.com/nuotsu/sanitypress/discussions/65#discussioncomment-12237198',
		},
		{
			quote:
				'A really cool Sanity + Next.js starter template. Go check it out! 🔥 <strong>Really great work</strong>, Mitchell.',
			author: {
				name: 'Kapehe',
				title: 'Head of Developer Community @ Vercel',
			},
			source:
				'https://www.sanity.io/blog/community-digest-may-24-edition#84fd322ef040',
		},
		{
			quote:
				"Dude, Mitchell's a <em>crazy</em> dev 🤯. Check out his <strong>MLB app</strong>.",
			author: {
				name: 'Shota',
				title: 'Senior Software Engineer @ Salesforce',
			},
			source: 'https://sb3.theohtani.com',
		},
	]
</script>

<section>
	<Headline>Testimonials</Headline>

	{#each testimonials as { quote, author, source }}
		<figure class="group relative grid">
			<blockquote>{@html quote}</blockquote>

			<figcaption class="ml-auto inline-flex">
				<dl class="flex flex-wrap gap-x-[.5ch] group-hover:bg-current/10">
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
</section>
