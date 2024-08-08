{#if image}
	<img
		src={urlFor(image.image).url()}
		alt={image.title}
		{width}
		{height}
		loading="lazy"
		draggable={false}
		{...props}
	/>
{/if}

<script lang="ts">
	import { urlFor } from '@/utils/sanity'
	import { getImageDimensions } from '@sanity/asset-utils'
	import type { HTMLImgAttributes } from 'svelte/elements'

	const {
		image,
		...props
	}: {
		image: Sanity.Midjourney
	} & HTMLImgAttributes = $props()

	const { width, height } =
		(image?.image && getImageDimensions(image.image)) ?? {}
</script>
