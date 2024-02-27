<section class="p-2">
	<h2><T {text} {delay} hideCursor="beforeStart" /></h2>
	<slot />
</section>

<script lang="ts">
	import T from './Typewriter.svelte'

	const { text, delay } = $props<{
		text: string
		delay: number
	}>()
</script>
