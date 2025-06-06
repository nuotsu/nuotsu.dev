<script lang="ts">
	import { page } from '$app/state'
	import { PortableText } from '@portabletext/svelte'
	import Img from '@/ui/Img.svelte'
</script>

<svelte:head>
	<title>About // nuotsu</title>
</svelte:head>

<article>
	<PortableText value={page.data.site?.about} />

	<figure>
		<Img image={page.data.site?.portrait} alt="Mitchell Christ" loading="eager" />
	</figure>
</article>
