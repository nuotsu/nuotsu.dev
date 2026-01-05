<script lang="ts">
	import Headline from '$ui/headline.svelte'
	import SourceCode from '$ui/source-code.svelte'

	const writing: {
		title: string
		href: string
	}[] = [
		{
			title: 'How Sanity MCP Transformed My Coding Experiences',
			href: 'https://typed.sanitypress.dev/blog/how-sanity-mcp-transformed-my-coding-experience',
		},
		{
			title: 'Building Carousels with CSS Only',
			href: 'https://typed.sanitypress.dev/blog/building-carousels-with-css-only',
		},
		{
			title: 'Architecting Websites with Sanity',
			href: 'https://typed.sanitypress.dev/blog/architecting-websites-with-sanity',
		},
		{
			title: 'Design Smarter, Build Faster: Modular Architecture',
			href: 'https://sanitypress.dev/blog/design-smarter-build-faster-modular-architecture',
		},
	]
</script>

<section>
	<Headline>Writing</Headline>

	<ul>
		{#each writing as { title, href }}
			<li>
				<a class="line-clamp-1 break-all" {href}>{title}</a>
			</li>
		{/each}
	</ul>

	<SourceCode file="src/ui/sections/writing.svelte" lines={7} />
</section>
