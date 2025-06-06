<script lang="ts">
	import { onNavigate } from '$app/navigation'
	import { page } from '$app/state'
	import { getBlockText } from '@/sanity/utils'
	import { PortableText } from '@portabletext/svelte'
	import '@/app.css'
	import type { LayoutData } from './$types'
	import type { Snippet } from 'svelte'

	let {
		data,
		children,
	}: {
		data: LayoutData
		children: Snippet
	} = $props()

	const links: Array<{
		label: string
		href: string
	}> = [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'About',
			href: '/about',
		},
	]

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})
</script>

<svelte:head>
	<title>nuotsu</title>
	<meta name="description" content={getBlockText(data.site?.headline as any, ' ')} />
</svelte:head>

<header>
	<hgroup>
		<PortableText value={data.site?.headline} />
	</hgroup>
</header>

<nav>
	{#each links as { href, label }}
		<a class:font-bold={page.route.id === `/(frontend)${href === '/' ? '' : href}`} {href}>
			{label}
		</a>
		{' '}
	{/each}
</nav>

<nav>
	<h2>Index</h2>
	<ol>
		{#each data.projects as project}
			<li class:font-bold={page.params.slug === project.metadata?.slug?.current}>
				<a href="/{project.metadata?.slug?.current}">
					{project.metadata?.title}
				</a>
			</li>
		{/each}
	</ol>
</nav>

{@render children()}

<footer>
	<nav>
		<h2>Links</h2>
		<ul>
			<li>
				<a href="https://x.com/marutchell">X</a>
			</li>
			<li>
				<a href="https://github.com/nuotsu">GitHub</a>
			</li>
			<li>
				<a href="mailto:mitchell@nuotsu.dev">Email</a>
			</li>
		</ul>
	</nav>
</footer>

<style>
	ol {
		list-style: index;
	}

	@counter-style index {
		system: extends decimal;
		pad: 2 '0';
		prefix: '[';
		suffix: '] ';
	}
</style>
