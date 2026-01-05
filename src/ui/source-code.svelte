<script lang="ts">
	import { browser } from '$app/environment'

	let { file } = $props()

	async function fetchSourceCode() {
		const res = await fetch(`/api/source-code?file=${file}`)
		const data = await res.json()
		return data satisfies string
	}
</script>

{#if browser && file}
	{#await fetchSourceCode() then code}
		<aside
			class="absolute inset-y-0 left-full no-scrollbar w-full overflow-x-clip overflow-y-auto border-r-[.5px] border-current/25 transition-opacity duration-400 starting:opacity-0"
		>
			<pre class="text-current/25">{code}</pre>
		</aside>
	{/await}
{/if}

<style>
	/* :global(section):has(> aside) {
		overflow-y: clip;
	} */

	aside {
		max-width: max(1lh, calc(50vw - (var(--container-2xl) / 2) + 1lh));
	}

	pre {
		tab-size: 2;
		font-size: xx-small;
	}
</style>
