<script lang="ts">
	import TableOfContents from '$ui/table-of-contents.svelte'
</script>

<header class="top-0 grid min-h-dvh md:sticky">
	<nav
		class="my-auto flex w-full max-w-(--toc-width) flex-col gap-ch p-ch transition-[margin-left] duration-800 max-md:mx-auto md:not-scrolled:ml-(--distance)"
	>
		<hgroup>
			<h1><a href="/">nuotsu</a></h1>
			<h2>Mitchell Christ</h2>
		</hgroup>

		<TableOfContents />
	</nav>
</header>

<style>
	nav {
		--distance: calc(50vw - var(--toc-width) / 2);
		will-change: margin-left;
	}
</style>
