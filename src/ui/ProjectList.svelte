<script lang="ts">
	import { page } from '$app/state'
	import type { Project } from '@/sanity/types'

	let { projects }: { projects: Project[] } = $props()
</script>

<nav>
	<ol>
		{#each projects as project}
			<li>
				<a
					class:font-bold={page.params.slug === project.metadata?.slug?.current}
					href={project.metadata?.slug?.current}
				>
					{project.metadata?.title}
				</a>
			</li>
		{/each}
	</ol>
</nav>

<style>
	li {
		list-style: inside number;
	}

	@counter-style number {
		system: extends decimal;
		/* prefix: 'No.'; */
		pad: 3 '0';
		suffix: ' ';
	}
</style>
