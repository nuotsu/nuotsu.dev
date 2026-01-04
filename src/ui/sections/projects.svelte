<script lang="ts">
	import Headline from '$ui/headline.svelte'

	const projects: {
		title: string
		href: string
		client?: true
	}[] = [
		{ title: 'human.marketing', href: 'https://human.marketing', client: true },
		{ title: 'CUSCO USA', href: 'https://cuscousainc.com', client: true },
		{
			title: 'SanityPress (original)',
			href: 'https://github.com/nuotsu/sanitypress',
		},
		{
			title: 'SvelteKit + Sanity template ',
			href: 'https://github.com/nuotsu/sveltekit-sanity',
		},
		{ title: 'things', href: 'https://things.nuotsu.dev' },
		{ title: 'ic0n.dev', href: 'https://ic0n.dev' },
		{ title: 'GitHub iframe', href: 'https://github-iframe.vercel.app' },
	]
</script>

<section>
	<Headline>Projects</Headline>

	<ul>
		{#each projects as { title, href, client }}
			<li class="relative">
				<a class="flex items-center gap-ch" {href}>
					<span class="line-clamp-1 break-all">{title}</span>

					{#if client}
						<small class="text-current/50">Client</small>
					{/if}

					<span class="absolute inset-0 text-transparent"></span>
				</a>
			</li>
		{/each}
	</ul>
</section>
