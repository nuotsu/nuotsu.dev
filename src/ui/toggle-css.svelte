<script lang="ts">
	let { checked = $bindable() } = $props()
</script>

<label class="flex items-center gap-x-ch select-none">
	<input type="checkbox" bind:checked switch />
	✨ Enable CSS
</label>
