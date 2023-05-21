<label for={label} on:dblclick={dblclick}>
	<input
		id={label}
		{min} {max}
		bind:value
		type="range"
		{...$$props}
	/>

	<span class="grid grid-cols-[1fr,auto]">
		{label}
		<output>{output || value}</output>
	</span>
</label>

<style>
	label {
		display: grid;
		grid-template-columns: 1fr 8em;
		align-items: center;
	}

	input {
		width: 100%;
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
