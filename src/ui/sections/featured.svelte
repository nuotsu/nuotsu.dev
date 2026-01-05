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
		<article class="relative grid items-end sm:grid-cols-2">
			<h3>
				<a class="flex flex-wrap items-center gap-x-ch sm:pl-ch" {href}>
					<span class="line-clamp-1 grow break-all">{title}</span>

					{#if repo}
						<GitHub {repo} />
					{/if}

					<span class="absolute inset-0 text-transparent">Link</span>
				</a>
			</h3>

			<figure
				class="relative order-first overflow-hidden bg-current/5 p-rlh text-[0px]"
			>
				<enhanced:img
					class="pointer-events-none absolute inset-0 -z-1 size-full object-cover"
					src={bgs[i % bgs.length]}
					alt={title}
					sizes="min(312px, 50vw)"
					loading="eager"
					fetchpriority="high"
					draggable="false"
				/>

				{#if image}
					<enhanced:img
						class="translate-y-2 opacity-0 transition-[opacity,translate] duration-600"
						src={image}
						alt={title}
						sizes="min(312px, 50vw)"
						loading="eager"
						fetchpriority="high"
						draggable="false"
						onload={(e) => {
							e.currentTarget.classList.remove('opacity-0')
							e.currentTarget.classList.remove('translate-y-2')
						}}
					/>
				{/if}
			</figure>
		</article>
	{/each}

	<SourceCode file="src/ui/sections/featured.svelte" lines={32} />
</section>

<style>
	article + article {
		padding-top: 1px;
	}
</style>
