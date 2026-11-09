<script lang="ts">
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

	let active = $state('')
	let url = $derived(active.replace(/^(https?:\/\/(www\.)?)/, ''))

	const formatter = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		timeZone: 'UTC'
	})

	const format = (date: string) => formatter.format(new Date(date))
</script>

<section class="section">
	<div class="relative">
		<ul
			class="full-bleed mb-lh carousel no-scrollbar auto-cols-[20ch] gap-[.5ch] overflow-y-clip px-ch md:px-lh"
		>
			{#each WRITING as { title, href, date }}
				<li>
					<a
						{href}
						class="button h-full rounded-tr-(--bevel) rounded-br-none"
						onmouseenter={() => (active = href)}
						onmouseleave={() => (active = '')}
						onpointerdown={() => (active = href)}
						onpointerup={() => (active = '')}
					>
						<strong class="line-clamp-3 uppercase">{title}</strong>
						<time class="text-[.8em]" datetime={date}>
							{format(date)}
						</time>
					</a>
				</li>
			{/each}
		</ul>

		<output
			class="absolute top-full right-0 mt-[.5ch] line-clamp-1 h-lh w-full border-t-sm pt-[.25ch] text-right text-[.75em] break-all"
			>{url}</output
		>
	</div>
</section>
