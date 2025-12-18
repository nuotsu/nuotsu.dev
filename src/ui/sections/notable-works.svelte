<script lang="ts">
	import Section from './section.svelte'
	import sanitypressImg from '$assets/sanitypress.jpeg'
	import scorebugImg from '$assets/mlb-scorebug.jpeg'
	import typegenImg from '$assets/typegen.jpeg'
</script>

<Section id="notable-works" class="space-y-[3rlh]" heading="Notable Works">
	{@render work(
		'SanityPress',
		'https://github.com/nuotsu/sanitypress',
		sanitypressImg,
		'Next.js + Sanity starter template with over 400 stars on GitHub. Featured on Sanity.io',
	)}

	{@render work(
		'MLB Live Scorebug',
		'https://github.com/nuotsu/sb3.theohtani.com',
		scorebugImg,
		'MLB APIs reverse-engineered with real-time live score updates and a custom UI.',
	)}

	{@render work(
		'SanityPress with Typegen',
		'https://typed.sanitypress.dev',
		typegenImg,
		'Improved successor to SanityPress, now with automatic type generation. Featured on Sanity.io',
	)}
</Section>

{#snippet work(title: string, href: string, src: string, alt: string)}
	<article>
		<figure class="grid items-end gap-x-[2lh] gap-y-lh lg:grid-cols-2">
			<a class="relative z-1 block" {href} aria-label={title}>
				<enhanced:img class="w-full shadow-xl" {src} {alt} loading="lazy" />
			</a>

			<figcaption
				class="sticky bottom-lh max-w-sm space-y-ch border-l border-foreground-subdued/20 py-[.5ch] pl-lh leading-tight"
			>
				<h3 class="manuscript h3">
					<a {href}>
						{title}
						<span class="absolute inset-0"></span>
					</a>
				</h3>

				<small>
					{alt}
				</small>
			</figcaption>
		</figure>
	</article>
{/snippet}

<style>
	figcaption::before {
		mask: linear-gradient(to top, #000 10%, transparent);
	}
</style>
