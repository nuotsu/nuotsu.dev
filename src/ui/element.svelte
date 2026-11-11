<script lang="ts">
	let element = $state<HTMLElement | null>(null)

	let path = $derived.by(() => {
		const tags: string[] = []
		for (
			let el: Element | null = element;
			el && el !== document.documentElement;
			el = el.parentElement
		)
			tags.unshift(el.localName)
		return tags.join('>')
	})
</script>

<svelte:window
	onpointerover={(e) => (element = e.target instanceof HTMLElement ? e.target : null)}
	onpointerout={(e) => e.pointerType === 'mouse' && !e.relatedTarget && (element = null)}
/>

<output class="truncate uppercase">
	{path}
</output>
