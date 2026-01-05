<script lang="ts">
	const { children } = $props()
</script>

<header class="absolute inset-y-0 -translate-x-lh">
	<h2 class="sticky top-0 pb-ch whitespace-nowrap">
		{@render children()}
	</h2>
</header>

<style>
	:global(*:has(> header)) {
		position: relative;
	}

	h2 {
		writing-mode: sideways-rl;
	}
</style>
