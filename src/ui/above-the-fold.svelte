<script lang="ts">
	import TableOfContents from '$ui/table-of-contents.svelte'
</script>

<header class="sticky top-0 grid min-h-dvh">
	<nav
		class="flex w-full max-w-(--toc-width) flex-col gap-ch place-self-center"
	>
		<hgroup>
			<h1><a href="/">nuotsu</a></h1>
			<h2>Mitchell Christ</h2>
		</hgroup>

		<TableOfContents />
	</nav>
</header>
