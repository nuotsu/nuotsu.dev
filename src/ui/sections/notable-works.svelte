<script lang="ts">
	import Section from './section.svelte'
	import sanitypressImg from '$assets/sanitypress.jpeg'
	import scorebugImg from '$assets/mlb-scorebug.jpeg'
</script>

<Section id="notable-works" class="space-y-[3rlh]">
	<h2 class="manuscript h1">Notable Works</h2>

	<div class="grid gap-[3lh] lg:grid-cols-2 *:lg:even:translate-y-1/4">
		{@render work(
			'SanityPress',
			'https://github.com/nuotsu/sanitypress',
			sanitypressImg,
			'Thomas Jefferson and two founding fathers typing on a macbook wearing gray baseball jersey with blue lettering "SanityPress", during the Continental Congress, oil painting by Norman Rockwell',
		)}

		{@render work(
			'MLB Live Scorebug',
			'https://github.com/nuotsu/sb3.theohtani.com',
			scorebugImg,
			'young Edo lad holding a black iphone wearing blue baseball jersey with white lettering "Scorebug" with the red number 3, a baseball bat and glove in his backpack, baseball stadium in the distant background, ukiyo-e style woodblock painting by Hokusai',
		)}
	</div>
</Section>

{#snippet work(title: string, href: string, src: string, alt: string)}
	<article
		class="relative text-center transition-[opacity,filter] duration-600"
	>
		<figure class="grid gap-lh lg:max-w-lg">
			<enhanced:img class="shadow-xl" {src} {alt} loading="lazy" />

			<figcaption>
				<a class="h3 italic transition-opacity not-hover:opacity-50" {href}>
					{title}
					<span class="absolute inset-0"></span>
				</a>
			</figcaption>
		</figure>
	</article>
{/snippet}

<style>
	div:has(article:hover) article:not(:hover) {
		opacity: 0.5;
		filter: grayscale(100%);
	}
</style>
