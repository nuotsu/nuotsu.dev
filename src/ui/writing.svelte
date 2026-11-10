<script lang="ts">
	import { createLinkPreview } from '#lib/link-preview.svelte.ts'
	import Section from '#ui/section.svelte'
	import LinkOutput from '#ui/link-output.svelte'

	const WRITING: { title: string; href: string; date: string }[] = [
		{
			title: 'Welcome to the age of personalized software',
			href: 'https://sanitypress.dev/blog/welcome-to-the-age-of-personalized-software',
			date: '2026-10-19'
		},
		{
			title: 'SanityPress Earns a Sanity Pioneer Spot',
			href: 'https://sanitypress.dev/blog/sanitypress-earns-a-sanity-pioneer-spot',
			date: '2026-08-04'
		},
		{
			title: 'Building Websites with Modules That Convert',
			href: 'https://sanitypress.dev/blog/building-websites-with-modules-that-convert',
			date: '2026-05-25'
		},
		{
			title: 'Why I Built My Own MLB App (And Why the Official One Frustrated Me)',
			href: 'https://mlb.theohtani.com/blog/2026-03-23-why-i-built-my-own-mlb-app',
			date: '2026-03-23'
		},
		{
			title: 'How Sanity MCP Transformed My Coding Experiences',
			href: 'https://sanitypress.dev/blog/how-sanity-mcp-transformed-my-coding-experience',
			date: '2026-11-12'
		}
	]

	const preview = createLinkPreview()

	const formatter = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		timeZone: 'UTC'
	})

	const format = (date: string) => formatter.format(new Date(date))
</script>

<Section title="Writing">
	<ul class="full-bleed carousel auto-cols-[20ch] gap-[.5ch] overflow-y-clip section pb-[.25ch]">
		{#each WRITING as { title, href, date }}
			<li>
				<a {href} class="button h-full bevel-tr" {@attach preview.attach}>
					<strong class="line-clamp-3 uppercase">{title}</strong>
					<time class="text-[.75em]" datetime={date}>
						{format(date)}
					</time>
				</a>
			</li>
		{/each}
	</ul>

	<LinkOutput {preview} stagger={12} />
</Section>
