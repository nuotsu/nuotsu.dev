<article class="space-y-[.5ch] px-[1ch]">
	<h2 class="sticky-header">Archive</h2>

	<ul
		class="full-bleed no-scrollbar flex max-w-max overflow-x-auto px-[0.5ch] whitespace-nowrap"
	>
		{#each projects as project, i}
			<li class="shrink-0">
				{project.url.replace(/^https?:\/\/(www\.)?/, '')}
			</li>
		{/each}
	</ul>
</article>

<style>
	ul {
		mask: linear-gradient(to right, black var(--via, 50%), transparent);
		padding-left: calc(env(safe-area-inset-left) + 0.5ch);
		padding-right: calc(18ch + env(safe-area-inset-right));

		@media (width < 480px) {
			--via: 0;
		}
	}

	li {
		writing-mode: vertical-lr;

		&:hover {
			background-color: var(--color-ink);
			color: var(--color-canvas);
		}
	}
</style>

<script lang="ts">
	let { projects }: { projects: Sanity.Project[] } = $props()
</script>
