<script lang="ts">
	import '@/app.css'
	import { page } from '$app/state'
	import { getBlockText } from '@@/src/sanity/utils'
	import type { LayoutData } from './$types'
	import type { Snippet } from 'svelte'

	let { data, children }: { data: LayoutData; children: Snippet } = $props()

	// in Comic Sans
	console.info(
		'%c web dev is my passion. 👨‍💻 ',
		'font: 2rem "Comic Sans MS"; background-image: linear-gradient(135deg, red, violet, blue, turquoise, green, yellow, orange, red); color: black;',
	)
</script>

<svelte:head>
	<title>nuotsu | Mitchell Kazumaru Christ</title>
	<meta name="description" content={getBlockText(data.site?.headline as any, ' ')} />
</svelte:head>

<header>
	<a href="/">nuotsu</a>
</header>

<nav>
	<ul>
		{#each data.projects as project}
			<li>
				<a
					class:font-bold={page.params.slug === project.metadata?.slug?.current}
					href={project.metadata?.slug?.current}
				>
					{project.metadata?.title}
				</a>
			</li>
		{/each}
	</ul>
</nav>

{@render children()}

<hr />

<footer>
	<a href="https://github.com/nuotsu">GitHub</a>
	<a href="https://x.com/marutchell">X</a>
</footer>
