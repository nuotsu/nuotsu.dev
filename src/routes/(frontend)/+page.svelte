<script lang="ts">
	import { PortableText } from '@portabletext/svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>

<header>
	<PortableText value={data.site?.headline} />
</header>
