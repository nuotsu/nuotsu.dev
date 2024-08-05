{#if image}
	<img
		src={urlFor(image.image).url()}
		alt={image.title}
		loading="lazy"
		draggable={false}
	/>
{/if}

<script lang="ts">
	import { urlFor } from '@/utils/sanity'

	const { image }: { image: Sanity.Midjourney } = $props()
</script>
