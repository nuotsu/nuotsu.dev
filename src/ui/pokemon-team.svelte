<script lang="ts">
	const box: { dex: string }[] = [
		{ dex: '3' },
		{ dex: '26a' },
		{ dex: '94' },
		{ dex: '136' },
		{ dex: '143' },
		{ dex: '212' },
		{ dex: '257' },
		{ dex: '295' },
		{ dex: '474' },
		{ dex: '768' },
		{ dex: '773' },
		{ dex: '826' },
		{ dex: '865' },
		{ dex: '1005' }, // 937
		{ dex: '923' },
	]

	let team = $state(box.slice(0, 6))

	$effect(() => {
		team = box.sort(() => Math.random() - 0.5).slice(0, 6)
	})
</script>

<svelte:head>
	<link rel="preconnect" href="https://img.yakkun.com" />
</svelte:head>

<figure class="flex items-end" aria-label="My favorie Pokémon">
	{#each team as { dex } (dex)}
		<img
			src="https://img.yakkun.com/poke/icon96/n{dex}.gif"
			alt={dex}
			width={96}
			height={96}
			loading="lazy"
			draggable="false"
		/>
	{/each}
</figure>

<style>
	img {
		--height: 3lh;
		width: var(--height);
		height: auto;
		margin-left: calc(var(--height) * -0.5);
		image-rendering: pixelated;
	}
</style>
