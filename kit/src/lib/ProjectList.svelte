<ul class="grid gap-1">
	{#each $page.data.projects as project}
		<li>
			<a
				class="inline-flex items-center gap-2 visited:text-neutral-400"
				href={project.url}
			>
				{#if project.repo}
					<StarCount repo={project.repo} />
				{/if}

				{project.title}
			</a>
		</li>
	{/each}
</ul>

<style>
	a {
		&::before {
			content: '👉';
		}

		&:not(:hover)::before {
			visibility: hidden;
		}
	}
</style>

<script lang="ts">
	import { page } from '$app/stores'
	import StarCount from './StarCount.svelte'
</script>
