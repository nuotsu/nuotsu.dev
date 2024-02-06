<header class="sticky bottom-0 order-1 flex w-full flex-col-reverse">
	<h1 class="panel-green text-ink font-shadow-ink text-xl">
		Welcome to nuotsu.dev!
	</h1>

	<nav
		class="panel-white text-ink font-shadow-ink has-arrow-links ml-auto grid max-w-max text-xl"
	>
		{#each pages as { title, url }}
			<a
				class="arrow-link uppercase"
				class:has-arrow={url === '/'
					? url === $page.url.pathname
					: $page.url.pathname.startsWith(url)}
				href={url}
			>
				{title}
			</a>
		{/each}
	</nav>
</header>

<script lang="ts">
	import { page } from '$app/stores'

	const pages: Page[] = [
		{ title: 'Home', url: '/' },
		{ title: 'Projects', url: '/projects' },
		{ title: 'Contact', url: '/contact' },
	]

	type Page = {
		title: string
		url: string
	}
</script>
