<ul class="grid gap-1">
	{#each $page.data.projects as project}
		<li>
			<a class="inline-flex gap-1 visited:text-neutral-400" href={project.url}>
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
</script>
