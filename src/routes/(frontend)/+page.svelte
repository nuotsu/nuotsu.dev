<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import Img from '@/ui/Img.svelte'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
</script>

<svelte:head>
	<title>nuotsu</title>
	<meta name="description" content="Mitchell Kazumaru Christ" />
</svelte:head>

<article class="max-w-md text-justify hyphens-auto [&_a]:font-bold">
	<PortableText value={data.site?.about} />
</article>

<ul
	class="no-scrollbar full-bleed flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-2"
>
	{#each data.projects as project}
		{@const [domain, ...path] = project.url?.replace(/https?:\/\/(www\.)?/, '').split('/') ?? []}

		<li
			class="bg-fg text-bg max-w-[calc(100vw-2rem)] shrink-0 snap-center p-2 pb-0 md:snap-start md:scroll-ml-4"
		>
			<a class="grid" href={project.url}>
				<Img class="h-auto w-sm" image={project.thumbnail} />

				<div class="flex font-bold">
					{domain}
					{#if path.length}
						<span class="line-clamp-1 text-current/50">
							/{path.join('/')}
						</span>
					{/if}
				</div>
			</a>
		</li>
	{/each}
</ul>
