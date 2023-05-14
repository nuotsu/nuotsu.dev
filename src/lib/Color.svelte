<input
	bind:value={color}
	id="color"
	type="color"
	hidden
	on:change={change}
>

<label
	for="color"
	class="cursor-pointer inline-block aspect-square rounded-full h-[1em]"
	style:background-color={color}
	title={color}
/>

<script lang="ts">
	import { onMount } from 'svelte'

	let color = '#feafea'

	function change() {
		document.documentElement.style.setProperty('--accent', color)
	}

	onMount(change)
</script>
