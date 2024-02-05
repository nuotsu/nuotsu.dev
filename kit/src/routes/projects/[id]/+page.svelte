<h1 class="font-shadow-white text-xl text-white">
	{data.project.title}
</h1>

<script lang="ts">
	import type { PageServerData } from './$types'

	const { data } = $props<{ data: PageServerData }>()
</script>
