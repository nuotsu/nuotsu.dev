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

<Section title="Writing" class="text-cp-green">
	<ul
		class="section carousel auto-cols-[20ch] gap-[.5ch] overflow-y-clip pb-[.25ch] max-xl:pr-lh max-xl:pl-[calc(1lh+.5ch)]"
	>
		{#each WRITING as { title, href, date }}
			<li>
				<a
					{href}
					class="button flex h-full flex-col gap-[.5lh] bevel-tr pt-lh before:slashes"
					{@attach preview.attach}
				>
					<strong class="uppercase">{title}</strong>

					<time class="mt-auto text-[.75em]" datetime={date}>
						{format(date)}
					</time>
				</a>
			</li>
		{/each}

		<li class="bevel grid place-content-center bevel-tr uppercase opacity-50">Stay tuned...</li>
	</ul>

	<LinkOutput {preview} stagger={12} />
</Section>

<style>
	@media (width < 80rem) {
		ul {
			margin-left: calc(-1lh - 0.5ch - env(safe-area-inset-left));
			margin-right: calc(-1lh - env(safe-area-inset-right));
		}
	}

	li {
		scroll-margin-left: calc(env(safe-area-inset-left) + 1lh + 0.5ch);
		scroll-snap-align: start;
	}

	a::before {
		position: absolute;
		top: 0;
		right: 0;
		transform: skewX(45deg);
		margin-top: 0.3ch;
		margin-right: 0.7ch;
		height: 0.7ch;
	}
</style>
