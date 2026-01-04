<script lang="ts">
	import sanitypress from '$assets/projects/sanitypress.png'
	import sb3 from '$assets/projects/sb3.png'
	import theOhtani from '$assets/projects/theohtani.png'
	import Headline from '$ui/headline.svelte'

	const projects: {
		hidden?: true
		title: string
		href: string
		image: string
	}[] = [
		{
			title: 'SanityPress',
			href: 'https://typegen.sanitypress.dev',
			image: sanitypress,
		},
		{
			title: 'MLB Live Scorebug',
			href: 'https://sb3.theohtani.com',
			image: sb3,
		},
		{
			hidden: true,
			title: 'The Ohtani',
			href: 'https://theohtani.com',
			image: theOhtani,
		},
	]

	const bgs = Object.entries(
		import.meta.glob('/src/assets/bg/*.jpeg', {
			eager: true,
			query: { enhanced: true },
		}),
	).map(([_path, module]) => (module as any).default)
</script>

<section>
	<Headline>Featured</Headline>

	{#each projects.filter((p) => !p.hidden) as { title, href, image }, i}
		<article class="relative grid grid-cols-2 items-end">
			<h3>
				<a {href}>
					{title}
					<span class="absolute inset-0 text-transparent">Link</span>
				</a>
			</h3>

			<figure class="relative order-first p-ch md:p-lh">
				<enhanced:img
					class="pointer-events-none absolute inset-0 -z-1 size-full object-cover"
					src={bgs[i % bgs.length]}
					alt={title}
					loading="eager"
					fetchpriority="high"
					draggable="false"
				/>

				<enhanced:img
					src={image}
					alt={title}
					loading="eager"
					fetchpriority="high"
					draggable="false"
				/>
			</figure>
		</article>
	{/each}
</section>
