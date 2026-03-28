<script lang="ts">
	let { checked = $bindable() } = $props()
</script>

<label class="flex items-center gap-x-ch select-none">
	<input type="checkbox" bind:checked switch />
	✨ Enable CSS
</label>

<style>
	@media (pointer: fine) {
		:global(label:hover ~ [data-css-target]) {
			animation: pulse 1s ease-in-out forwards infinite;
		}
	}

	@media (pointer: coarse) {
		:global(label:active ~ [data-css-target]) {
			animation: pulse 1s ease-in-out forwards infinite;
		}
	}

	@keyframes pulse {
		0%,
		100% {
			outline: 1px dashed transparent;
		}

		50% {
			outline: 1px dashed color-mix(in srgb, currentColor 50%, transparent);
		}
	}
</style>
