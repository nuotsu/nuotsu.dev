<ul class="grid">
	{#each $page.data.projects as project}
		{#if !project.hidden}
			<li>
				<a
					class="inline-flex py-[2px] items-center gap-2 visited:text-neutral-400 hover:italic"
					href={project.url}
				>
					{#if project.repo}
						<StarCount repo={project.repo} />
					{/if}

					{project.title}

					<Japanese text={project.japanese} />
				</a>
			</li>
		{/if}
	{/each}
</ul>

<script lang="ts">
	import { page } from '$app/stores'
	import StarCount from './StarCount.svelte'
	import Japanese from './Japanese.svelte'
</script>
