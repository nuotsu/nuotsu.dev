<section
	class="landscape:pr-[env(safe-area-inset-right)] landscape:pl-[env(safe-area-inset-left)]"
>
	<ProjectList projects={data.projects} />
</section>

<script lang="ts">
	import ProjectList from '@/lib/ProjectList.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>
