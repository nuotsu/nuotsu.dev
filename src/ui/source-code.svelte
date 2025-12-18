<script lang="ts">
	let { path } = $props()

	async function getSourceCode() {
		const response = await fetch(`/api/source-code?file=${path}`)
		return response.json()
	}
</script>

{#await getSourceCode() then code}
	<div
		class="pointer-events-none absolute top-0 left-280 ml-auto bg-background px-lh before:bg-linear-to-t before:from-background"
	>
		<pre class="text-xs opacity-5 md:opacity-10">{code}</pre>
	</div>
{/await}

<style>
	div:before {
		position: absolute;
		inset: auto 0 100%;
		height: 4lh;
	}
</style>
