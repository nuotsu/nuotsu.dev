<script lang="ts">
	let views = $state(0)
</script>

<aside class="fixed bottom-0 left-0 z-1 md:max-w-(--toc-width)">
	<small class="block p-ch text-foreground-subdued opacity-20"
		>{views} views</small
	>
</aside>

<style>
	small {
		padding-bottom: max(1ch, env(safe-area-inset-bottom));
	}
</style>
