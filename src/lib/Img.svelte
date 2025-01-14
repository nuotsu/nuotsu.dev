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

<script lang="ts">
	import { urlFor } from '@/sanity/lib/image'
	import {
		getImageDimensions,
		type SanityImageSource,
	} from '@sanity/asset-utils'
	import type { ImageUrlBuilderOptions } from '@sanity/image-url/lib/types/types'

	const {
		class: className,
		image,
		alt,
		loading = 'lazy',
		width,
		height,
		draggable,
		options = {},
	}: {
		class?: string
		image?: Sanity.Image
		options?: ImageUrlBuilderOptions
	} & Partial<HTMLImageElement> = $props()

	function getDimensions(image: Sanity.Image) {
		const { width: w, height: h } = getImageDimensions(image)

		return {
			w: width || (typeof height === 'number' ? (height * w) / h : w),
			h: height || (typeof width === 'number' ? (width * h) / w : h),
		}
	}
</script>
