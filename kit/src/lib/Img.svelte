{#if image}
	<img
		src={urlFor(image.image).url()}
		alt={image.title}
		{width}
		{height}
		loading="lazy"
		draggable={false}
	/>
{/if}

<script lang="ts">
	import { urlFor } from '@/utils/sanity'
	import { getImageDimensions } from '@sanity/asset-utils'

	const { image }: { image: Sanity.Midjourney } = $props()

	const { width, height } =
		(image?.image && getImageDimensions(image.image)) ?? {}
</script>
