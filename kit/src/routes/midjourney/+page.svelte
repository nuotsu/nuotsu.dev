<svelte:head>
	<title>Midjourney Image Generation | nuotsu</title>
	<meta
		name="description"
		content="I generate images with Midjourney. I make websites, too."
	/>
</svelte:head>

<Header title="I generate images.">
	I make <a href="/">websites</a>, too.
</Header>

<article class="max-w-5xl mx-auto py-24 space-y-24">
	{#each data.midjourney as image, i}
		<figure
			class="odd:pr-[10vw] even:pl-[10vw] max-w-max even:ml-auto odd:mr-auto"
		>
			<Img
				class="max-h-svh w-auto"
				{image}
				loading={i < 2 ? 'eager' : 'lazy'}
			/>
		</figure>
	{/each}
</article>

<script lang="ts">
	import Header from '@/lib/Header.svelte'
	import Img from '@/lib/Img.svelte'

	const { data } = $props()
</script>
