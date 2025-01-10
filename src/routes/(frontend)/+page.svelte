<svelte:head>
	<title>Mitchell Kazumaru Christ | nuotsu</title>
	<meta name="description" content={description} />
</svelte:head>

<header
	class="grid min-h-svh place-content-center p-4 text-center text-balance"
>
	<h1 class="text-2xl">{description}</h1>
</header>

<article class="p-4 text-lg">
	<ul>
		{#each projects as project}
			<li>
				<a
					href={project.url}
					class="group inline-flex flex-wrap items-center gap-4 visited:text-[#89898b]"
				>
					<span class="group-hover:line-through">{project.title}</span>

					{#if project.repo}
						{@const { stargazers, forks } = project}

						{#if stargazers || forks}
							<small class="text-xs">
								{#if stargazers}
									<span>★{stargazers}</span>
								{/if}

								{#if forks}
									<span>⑂{forks}</span>
								{/if}
							</small>
						{/if}
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</article>

<article class="space-y-4">
	{#each data.midjourney as midjourney}
		<figure>
			<Img
				class="w-full"
				image={midjourney.image}
				alt={midjourney.title}
				draggable={false}
			/>
		</figure>
	{/each}
</article>

<script lang="ts">
	import Img from '@/lib/Img.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	const description = 'I build websites & generate images.'

	const projects = data.projects
		.sort((a, b) => b.stargazers - a.stargazers)
		.filter((project) => !project.hidden)
</script>
