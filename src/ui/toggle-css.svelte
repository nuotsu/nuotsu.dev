<script lang="ts">
	let { checked = $bindable() } = $props()
</script>

<label class="select-none">
	<input type="checkbox" bind:checked switch />
	✨ Enable CSS
</label>
