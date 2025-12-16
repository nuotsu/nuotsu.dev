<script lang="ts">
	import Section from './section.svelte'
	import sanitypressImg from '$assets/sanitypress.jpeg'
	import scorebugImg from '$assets/mlb-scorebug.jpeg'
	import typegenImg from '$assets/typegen.jpeg'
</script>

<Section id="notable-works" class="space-y-[3rlh]" heading="Notable Works">
	<div class="grid gap-[3lh] lg:grid-cols-2 *:lg:even:translate-y-1/2">
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
	</div>
</Section>

{#snippet work(title: string, href: string, src: string, alt: string)}
	<article
		class="group relative m-auto text-center transition-[opacity,filter] duration-600"
	>
		<div class="grid gap-lh lg:max-w-lg">
			<figure class="relative overflow-hidden shadow-xl">
				<enhanced:img {src} {alt} loading="lazy" />

				<figcaption
					class="absolute inset-0 flex flex-col justify-end p-lh text-sm text-balance transition-transform duration-600 group-not-hover:translate-y-full before:absolute before:inset-0 before:top-[-5lh] before:bg-background/50 before:backdrop-blur-md before:backdrop-brightness-125 before:backdrop-saturate-150"
				>
					<span class="relative">{alt}</span>
				</figcaption>
			</figure>

			<h3 class="manuscript">
				<a class=" h3 italic transition-opacity not-hover:opacity-50" {href}>
					{title}
					<span class="absolute inset-0"></span>
				</a>
			</h3>
		</div>
	</article>
{/snippet}

<style>
	figcaption::before {
		mask: linear-gradient(to top, #000 10%, transparent);
	}
</style>
