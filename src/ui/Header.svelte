<script lang="ts">
	import { page } from '$app/state'
	import type { Project } from '@/sanity/types'

	let { projects }: { projects: Project[] } = $props()
</script>

<header>
	<nav class="gap-ch grid items-start">
		<div><a class="bg-bg px-[.5ch]" href="/">nuotsu</a></div>

		<ol class="flex flex-col items-start">
			{#each projects as project}
				<li
					class="bg-bg px-[.5ch]"
					class:font-bold={page.params.slug === project.metadata?.slug?.current}
				>
					<a href={project.metadata?.slug?.current}>
						{project.metadata?.title}
					</a>
				</li>
			{/each}
		</ol>
	</nav>
</header>

<style>
	li {
		list-style: inside number;
	}

	@counter-style number {
		system: extends decimal;
		pad: 3 '0';
		suffix: '  ';
	}
</style>
