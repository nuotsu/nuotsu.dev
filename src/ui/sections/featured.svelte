<script lang="ts">
	import { featured } from '$lib/projects'
	import GitHub from '$ui/github.svelte'
	import Headline from '$ui/headline.svelte'
	import SourceCode from '$ui/source-code.svelte'

	const bgs = Object.entries(
		import.meta.glob('/src/assets/bg/*.jpeg', {
			eager: true,
			query: { enhanced: true },
		}),
	).map(([_path, module]) => (module as any).default)
</script>

<section>
	<Headline>Featured</Headline>

	{#each featured as { title, href, image, repo }, i}
		<article class="relative grid grid-cols-2 items-end">
			<h3>
				<a class="flex items-center gap-ch pl-ch" {href}>
					<span class="line-clamp-1 grow break-all">{title}</span>

					{#if repo}
						<GitHub {repo} />
					{/if}

					<span class="absolute inset-0 text-transparent">Link</span>
				</a>
			</h3>

			<figure class="relative order-first p-ch text-transparent md:p-lh">
				<enhanced:img
					class="pointer-events-none absolute inset-0 -z-1 size-full object-cover"
					src={bgs[i % bgs.length]}
					alt={title}
					loading="eager"
					fetchpriority="high"
					draggable="false"
				/>

				{#if image}
					<enhanced:img
						src={image}
						alt={title}
						loading="eager"
						fetchpriority="high"
						draggable="false"
					/>
				{/if}
			</figure>
		</article>
	{/each}

	<SourceCode file="src/ui/sections/featured.svelte" />
</section>
