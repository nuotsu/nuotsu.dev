<script lang="ts">
	import { page } from '$app/state'

	$inspect(page.route.id)
</script>

<nav
	style="grid-area: index"
	class="space-y-ch bottom-lh mt-auto md:sticky"
	class:homepage={page.route.id === '/(frontend)'}
>
	<h2><a href="/">Index</a></h2>

	<ol class="grid gap-[.5ch]">
		{#each page.data.projects as project}
			<li class="flex">
				<a
					class="hover:link line-clamp-1 hover:opacity-100"
					class:opacity-30={page.route.id === '/(frontend)/[slug]' &&
						page.params.slug !== project.metadata?.slug?.current}
					href="/{project.metadata?.slug?.current}"
				>
					{project.metadata?.title}
				</a>
			</li>
		{/each}
	</ol>

	<a class="hover:link" href="/about">About</a>
</nav>

<style>
	li {
		counter-increment: index;

		a::before {
			content: '[' counter(index, decimal-leading-zero) ']';
			font-variant-numeric: tabular-nums;
			margin-right: 1ch;
		}
	}
</style>
