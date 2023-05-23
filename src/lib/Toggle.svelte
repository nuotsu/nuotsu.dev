<label class="flex items-center px-2 gap-2" for={label}>
	<input id={label} type="checkbox" bind:checked>
	{label}
</label>

<script lang="ts">
	export let
		label: string,
		checked: boolean = false
</script>
