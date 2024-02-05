<h1 class="font-shadow-white text-xl text-white">Projects</h1>

<ul class="font-shadow-black bg-yellow-400 text-lg text-black">
	{#each data.projects as project, i}
		<li class="line-clamp-1">
			<a class="arrow-link block" href="/projects/{project.id.current}">
				No{(data.projects.length - i).toString().padStart(3, '0')}&nbsp;
				{project.title}
			</a>
		</li>
	{/each}
</ul>

<script lang="ts">
	import type { PageServerData } from './$types'

	const { data } = $props<{ data: PageServerData }>()
</script>
