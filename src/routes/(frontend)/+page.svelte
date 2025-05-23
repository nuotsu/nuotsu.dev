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

<header class="text-balance">
	<PortableText value={data.site?.headline} />
</header>
