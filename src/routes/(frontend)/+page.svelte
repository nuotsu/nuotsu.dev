<script lang="ts">
	import Domains from '@/lib/Domains.svelte'
	import Projects from '@/lib/Projects.svelte'
	import Writing from '@/lib/Writing.svelte'
	import Contact from '@/lib/Contact.svelte'
	import WebsiteCount from '@/lib/WebsiteCount.svelte'
	import Archive from '@/lib/Archive.svelte'
	import About from '@/lib/About.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
	let { site, projects, writings, domains } = data
</script>

<Domains {domains} />
<Projects {projects} />
<Writing {writings} />
<Contact />

<section class="grid items-start gap-[1ch] *:col-span-full *:row-span-full">
	<WebsiteCount {projects} />
	<Archive {projects} />
</section>

<About {site} />
