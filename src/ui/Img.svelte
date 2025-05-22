<script lang="ts">
	import { urlFor } from '$lib/sanity/image'
	import { getImageDimensions, type SanityImageSource } from '@sanity/asset-utils'
	import type { ImageUrlBuilderOptions } from '@sanity/image-url/lib/types/types'

	let {
		class: className,
		image,
		alt,
		width,
		height,
		loading = 'lazy',
		draggable,
		options = {},
	}: {
		class?: string
		image?: any
		options?: ImageUrlBuilderOptions
	} & Partial<HTMLImageElement> = $props()

	function getDimensions(image: SanityImageSource) {
		const { width: w, height: h } = getImageDimensions(image)

		return {
			w: width || (typeof height === 'number' ? (height * w) / h : w),
			h: height || (typeof width === 'number' ? (width * h) / w : h),
		}
	}
</script>

{#if image}
	{@const { w, h } = getDimensions(image)}

	<img
		class={className}
		src={urlFor(image)
			.withOptions({
				width,
				height,
				...options,
			})
			.auto('format')
			.url()}
		width={w}
		height={h}
		{loading}
		{alt}
		{draggable}
	/>
{/if}
