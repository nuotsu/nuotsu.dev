<section class="text-shadow flex min-h-svh flex-col justify-between gap-4 p-3">
	<ProjectList projects={data.projects} />

	<h2
		class="mr-[env(safe-area-inset-right)] ml-auto max-w-48 text-right text-2xl"
	>
		I build websites & gnerate images.
	</h2>
</section>

<script lang="ts">
	import ProjectList from '@/lib/ProjectList.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>
