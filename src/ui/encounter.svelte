<script lang="ts">
	const { views = 0 } = $props()
</script>

<aside
	class="bottom-0 left-0 z-1 max-md:text-right md:fixed md:max-w-(--toc-width)"
>
	<small class="block p-ch text-foreground-subdued opacity-20">
		{views.toLocaleString()} views
	</small>
</aside>

<style>
	small {
		padding-bottom: max(1ch, env(safe-area-inset-bottom));
	}
</style>
