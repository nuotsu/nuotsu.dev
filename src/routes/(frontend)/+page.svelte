<script lang="ts">
	import { getBlockText } from '@@/src/sanity/utils'
	import { PortableText } from '@portabletext/svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>

<svelte:head>
	<title>nuotsu | Mitchell Kazumaru Christ</title>
	<meta name="description" content={getBlockText(data.site?.headline as any, ' ')} />
</svelte:head>

<header class="m-auto max-w-prose p-[1ch] text-center text-balance [&_h1]:font-bold">
	<PortableText value={data.site?.headline} />
</header>
