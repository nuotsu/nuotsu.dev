<script lang="ts">
	import { encode } from 'uqr'

	const { size = 50 } = $props<{ size?: number }>()

	const result = encode('https://nuotsu.dev')
	const moduleSize = $derived(size / result.size)
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 {size} {size}"
	xmlns="http://www.w3.org/2000/svg"
	role="img"
	aria-label="QR code for nuotsu.dev"
>
	{#each result.data as row, y (`${y}`)}
		{#each row as cell, x (`${y}-${x}`)}
			{#if cell}
				<rect
					x={x * moduleSize}
					y={y * moduleSize}
					width={moduleSize}
					height={moduleSize}
					fill="currentColor"
				/>
			{/if}
		{/each}
	{/each}
</svg>
