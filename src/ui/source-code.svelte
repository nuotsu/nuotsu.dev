<script lang="ts">
	import { browser } from '$app/environment'

	let { file, lines = 0 } = $props()

	async function fetchSourceCode() {
		const res = await fetch(`/api/source-code?file=${file}&lines=${lines}`)
		const data = await res.text()
		return data satisfies string
	}
</script>

{#if browser && file}
	{#await fetchSourceCode() then code}
		<aside
			class="absolute inset-y-0 left-full w-full border-r-[.5px] border-current/25 transition-opacity duration-400 starting:opacity-0"
		>
			<pre class="pointer-events-none text-current/25">{code}</pre>
		</aside>
	{/await}
{/if}

<style>
	:global(section):has(> aside) {
		overflow-y: clip;
	}

	aside {
		max-width: max(1lh, calc(50vw - (var(--container-2xl) / 2) + 1lh));
	}

	pre {
		tab-size: 2;
		font-size: xx-small;
	}
</style>
