<ProjectList projects={data.projects} />
<Contact />

<section class="grid items-start gap-[1ch] *:col-span-full *:row-span-full">
	<WebsiteCount projects={data.projects} />
	<WebsiteArchive projects={data.projects} />
</section>

<script lang="ts">
	import ProjectList from '@/lib/ProjectList.svelte'
	import Contact from '@/lib/Contact.svelte'
	import WebsiteCount from '@/lib/WebsiteCount.svelte'
	import WebsiteArchive from '@/lib/WebsiteArchive.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>
