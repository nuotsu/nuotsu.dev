<script lang="ts">
	import Section from './section.svelte'

	const writings = {
		'How Sanity MCP Transformed My Coding Experiences':
			'https://typed.sanitypress.dev/blog/how-sanity-mcp-transformed-my-coding-experience',
		'Building Carousels with CSS Only':
			'https://typed.sanitypress.dev/blog/building-carousels-with-css-only',
		'Architecting Websites with Sanity':
			'https://typed.sanitypress.dev/blog/architecting-websites-with-sanity',
		'Design Smarter, Build Faster: Modular Architecture':
			'https://sanitypress.dev/blog/design-smarter-build-faster-modular-architecture',
	}
</script>

<Section
	id="writing"
	heading="Writing"
	class="prose"
	inspect="src/ui/sections/writing.svelte"
>
	<ul>
		{#each Object.entries(writings) as [title, href]}
			<li>
				<a {href}>{title}</a>
			</li>
		{/each}
	</ul>

	<p>
		Read more on
		<a href="https://typed.sanitypress.dev/blog">this blog</a>
		or
		<a href="https://sanitypress.dev/blog">this blog</a>.
	</p>
</Section>
