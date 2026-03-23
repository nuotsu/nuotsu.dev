<script lang="ts">
	import { projects } from '$lib/constants'
</script>

<section class="section">
	<h2 class="sr-only">Projects</h2>

	<ul class="unordered-list">
		{#each projects as project}
			<li>
				<a class="inline-flex flex-wrap gap-x-ch" href={project.href}>
					<span class="link">{project.title}</span>

					{#if project.year}
						<time class="text-subdued">{project.year}</time>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</section>
