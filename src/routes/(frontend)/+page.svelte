<script lang="ts">
	import { getBlockText } from '@/sanity/utils'
	import type { PageData } from './$types'
	import { PortableText } from '@portabletext/svelte'

	let { data }: { data: PageData } = $props()
</script>

<svelte:head>
	<title>Mitchell Christ // nuotsu</title>
	<meta name="description" content={getBlockText(data.site?.headline as any, ' ')} />
</svelte:head>

<header class="prose [&_a]:link">
	<PortableText value={data.site?.headline} />
</header>
