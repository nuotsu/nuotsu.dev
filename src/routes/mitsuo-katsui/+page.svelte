{#snippet grid({ level = 0, orders = [1, 2, 4, 3], order })}
	{#snippet item({ order })}
		<div
			class="grid place-content-center"
			style:order
			style:background-color="hsl(0, 0%, {Math.floor(Math.random() * 100)}%)"
		></div>
	{/snippet}

	{#if level < 9}
		<div
			class="grid grid-cols-2 [grid-auto-rows:1fr]"
			style:order
			class:min-h-screen={level === 0}
		>
			{#each orders as o, i}
				{#if i < orders.length - 1}
					{@render item({ order: o })}
				{:else}
					{@render grid({
						level: level + 1,
						orders: [...orders.slice(1), orders[0]],
						order: orders[orders.length - 1],
					})}
				{/if}
			{/each}
		</div>
	{/if}
{/snippet}

{@render grid({})}

<style>
	.grid:nth-child(even) {
		@apply bg-ink/5;
	}
</style>
