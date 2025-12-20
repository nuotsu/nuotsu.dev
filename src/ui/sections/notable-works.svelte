<script lang="ts">
	import Section from './section.svelte'
	import sanitypressImg from '$assets/sanitypress.jpeg'
	import scorebugImg from '$assets/mlb-scorebug.jpeg'
	import typegenImg from '$assets/typegen.jpeg'
</script>

<Section
	id="notable-works"
	class="space-y-[3rlh] "
	heading="Notable Works"
	inspect="src/ui/sections/notable-works.svelte"
>
	{@render work(
		'SanityPress',
		'https://github.com/nuotsu/sanitypress',
		sanitypressImg,
		'Next.js + Sanity (headless CMS) developer-focused starter template with over 400 stars on GitHub. Featured on Sanity.io',
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
		<figure class="relative grid items-end gap-x-[2lh] gap-y-lh lg:grid-cols-2">
			<a
				{href}
				class="relative z-1 block overflow-clip shadow-xl after:bg-foreground/80 after:backdrop-blur-lg"
				aria-label={title}
			>
				<enhanced:img class="w-full" {src} {alt} loading="lazy" />
			</a>

			<figcaption
				class="sticky bottom-[20svh] max-w-sm space-y-ch border-l border-foreground-subdued/20 py-[.5ch] pl-lh leading-tight lg:bottom-lh"
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
	@supports (animation-timeline: view()) {
		a:has(:global(img))::after {
			content: '';
			position: absolute;
			inset: 0;
			box-shadow: 0.5lh 0 1lh #0004;
			animation: reveal ease-in-out;
			animation-fill-mode: backwards;
			animation-timeline: view();
		}

		@keyframes reveal {
			0% {
				translate: 0 0;
			}

			50%,
			100% {
				translate: calc(-100% - 1lh) 0;
			}
		}
	}
</style>
