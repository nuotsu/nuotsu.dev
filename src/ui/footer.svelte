<script lang="ts">
	import { page } from '$app/state'

	const views = $derived(page.data.views ?? 0)
</script>

<footer class="lines-x flex justify-between gap-ch">
	<span>{views} views</span>

	<small class="text-base">&copy; {new Date().getFullYear()}</small>
</footer>
