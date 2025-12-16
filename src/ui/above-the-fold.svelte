<script lang="ts">
	import TableOfContents from '$ui/table-of-contents.svelte'
</script>

<header
	class="top-0 z-1 grid transition-colors max-md:[--offset:2lh] md:sticky md:w-0 at-bottom:text-white"
>
	<nav
		class="my-auto flex w-(--toc-width) flex-col gap-ch p-ch transition-[margin-left] duration-800 max-md:mx-auto md:not-scrolled:ml-(--distance)"
	>
		<hgroup>
			<h1
				class="font-serif text-foreground-subdued italic transition-colors at-bottom:text-white/50"
			>
				<a href="/">nuotsu</a>
			</h1>
			<h2>Mitchell Christ</h2>
		</hgroup>

		<TableOfContents />
	</nav>
</header>

<style>
	header {
		min-height: calc(100lvh + var(--offset, -1lh));
	}

	nav {
		--distance: calc(50vw - var(--toc-width) / 2);
		will-change: margin-left;
	}
</style>
