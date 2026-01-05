<script lang="ts">
	import Headline from '$ui/headline.svelte'
	import SourceCode from '$ui/source-code.svelte'

	const links: { label: string; href: string }[] = [
		{ label: 'GitHub', href: 'https://github.com/nuotsu' },
		{ label: 'LinkedIn', href: 'https://linkedin.com/in/nuotsu' },
		{ label: 'X', href: 'https://x.com/marutchell' },
		{ label: 'Midjourney', href: 'https://www.midjourney.com/@nuotsu' },
		{ label: 'Email', href: 'mailto:mitchell@nuotsu.dev' },
	]
</script>

<section>
	<Headline>Contact</Headline>

	<ul class="grid grid-cols-2 text-center">
		{#each links as { label, href }}
			<li>
				<a class="line-clamp-1 break-all" {href}>{label}</a>
			</li>
		{/each}
	</ul>

	<SourceCode file="src/ui/sections/contact.svelte" lines={6} />
</section>
