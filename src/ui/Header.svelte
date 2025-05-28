<script lang="ts">
	const aliases = ['nuotsu', 'ヌ乙', 'XZ', 'Kazumaru']
	let aliasIndex = $state(0)
</script>

<header style="grid-area: header" class="top-lh sticky z-10 dark:mix-blend-exclusion">
	<div class="gap-ch flex flex-wrap">
		<a href="/">Mitchell Christ</a>

		<button
			class="text-fg/30 cursor-pointer"
			onclick={() => (aliasIndex = (aliasIndex + 1) % aliases.length)}
		>
			{aliases[aliasIndex]}
		</button>
	</div>

	<p class="text-fg/30">Web Dev</p>
</header>

<style>
	button::before {
		content: '// ' / 'alias';
	}
</style>
