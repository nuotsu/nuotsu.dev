<Header title="I generate images.">
	I make <a href="/">websites</a>, too.
</Header>

<article class="max-w-5xl mx-auto py-24 space-y-24">
	{#each data.midjourney as image}
		<figure class="odd:pr-[10vw] even:pl-[10vw]">
			<Img {image} />
		</figure>
	{/each}
</article>

<script lang="ts">
	import Header from '@/lib/Header.svelte'
	import Img from '@/lib/Img.svelte'

	const { data } = $props()
</script>
