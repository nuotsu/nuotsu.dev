<label class="grid items-center px-2 gap-2" for={label} on:dblclick={dblclick}>
	<input
		class="w-full"
		id={label}
		{min} {max}
		bind:value
		type="range"
		{...$$props}
	/>

	<span class="grid grid-cols-[1fr,auto] gap-2">
		{label}
		<output>{output || value}</output>
	</span>
</label>

<style>
	label {
		grid-template-columns: 1fr 8em;
	}
</style>

<script lang="ts">
	export let
		label: string,
		min: number = 0,
		max: number,
		value: number,
		output: number | undefined = undefined

	const initial = value

	function dblclick() {
		if (initial !== undefined) {
			value = initial
		}
	}
</script>
