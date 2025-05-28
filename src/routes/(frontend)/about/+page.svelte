<script lang="ts">
	import { page } from '$app/state'
	import { PortableText } from '@portabletext/svelte'
</script>

<svelte:head>
	<title>About // nuotsu</title>
</svelte:head>

<article class="space-y-ch leading-relaxed text-pretty">
	<PortableText value={page.data.site?.about} />
</article>

<style>
	article > :global(:first-child::first-letter) {
		font-size: xx-large;
		line-height: 0;
	}
</style>
