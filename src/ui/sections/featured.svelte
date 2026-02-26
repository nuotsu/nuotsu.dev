<script lang="ts">
	import { featured } from '$lib/constants'
	import imageSet, { type Picture } from '$lib/image-set'
	import GitHub from '$ui/github.svelte'
	import Headline from '$ui/headline.svelte'
	import SourceCode from '$ui/source-code.svelte'

	const bgs: Picture[] = Object.entries(
		import.meta.glob('/src/assets/bg/*.jpeg', {
			eager: true,
			query: { enhanced: true },
		}),
	).map(([_path, module]) => (module as any).default)
</script>

<section class="isolate">
	<Headline>Featured</Headline>

	{#each featured as { title, href, image, repo, tags, awards }, i}
		<article class="group/featured relative grid items-end sm:grid-cols-2">
			<h3>
				<a class="flex items-center gap-x-ch sm:pl-ch" {href}>
					<span class="line-clamp-1 grow break-all">{title}</span>

					{#if repo}
						<GitHub {repo} />
					{/if}

					<span class="absolute inset-0 text-transparent">Link</span>
				</a>

				{#if awards?.title}
					<p
						class=" pb-[.5ch] italic group-hover/featured:bg-current/10 sm:px-ch"
					>
						<span class="line-clamp-1 text-xs break-all text-yellow-600">
							{awards.title}
						</span>
					</p>
				{/if}

				{#if tags}
					<ul
						class="flex flex-wrap gap-[.5ch] px-[.5px] pb-[.5ch] text-xs group-hover/featured:bg-current/10 sm:px-rch"
					>
						{#each tags as tag}
							<li class="bg-white px-ch">{tag}</li>
						{/each}
					</ul>
				{/if}
			</h3>

			<figure
				class="relative -z-1 order-first overflow-hidden bg-current/5 p-rlh text-[0px]"
				style:background-image={imageSet(bgs[i % bgs.length])}
			>
				{#if image}
					<enhanced:img
						class="translate-y-2 opacity-0 transition-[opacity,translate] duration-600"
						src={image}
						alt={title}
						draggable="false"
						sizes="min(312px, 50vw)"
						loading="eager"
						fetchpriority="high"
						onload={(e) => {
							e.currentTarget.classList.remove('opacity-0')
							e.currentTarget.classList.remove('translate-y-2')
						}}
					/>
				{/if}

				{#if awards?.images}
					<div class="absolute right-rch bottom-rch flex *:not-first:-ml-rch">
						{#each awards?.images as image}
							<enhanced:img
								class="-translate-x-2 opacity-0 transition-[opacity,translate] delay-400 duration-600"
								width="40"
								height="40"
								src={image}
								alt={title}
								draggable="false"
								loading="lazy"
								onload={(e) => {
									e.currentTarget.classList.remove('opacity-0')
									e.currentTarget.classList.remove('-translate-x-2')
								}}
							/>
						{/each}
					</div>
				{/if}
			</figure>
		</article>
	{/each}

	<SourceCode file="src/ui/sections/featured.svelte" lines={49} />
</section>

<style>
	article + article {
		padding-top: 1px;
	}

	figure {
		background: center/cover no-repeat;
	}
</style>
