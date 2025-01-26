<article id="archive" class="space-y-[.5ch] px-[1ch]">
	<h2 class="sticky-header">Archive</h2>

	<ul class="full-bleed no-scrollbar flex max-w-max overflow-x-auto px-[0.5ch] whitespace-nowrap">
		{#each projects as project, i}
			{@const url = project.url.replace(/^https?:\/\/(www\.)?/, '')}

			<li data-year={new Date(project.startDate).getFullYear()}>
				<span>
					{#if project.redacted}
						{url.replace(/(?<=\b[A-Za-z]+)[a-z]/g, '*')}
					{:else}
						{url}
					{/if}
				</span>
			</li>
		{/each}
	</ul>
</article>

<style>
	ul {
		padding-left: calc(0.5ch + env(safe-area-inset-left));
		padding-right: calc(18ch + env(safe-area-inset-right));

		:global(body:not(:has(tr[data-year]:hover))) & {
			mask: linear-gradient(to right, black var(--via, 50%), transparent);

			@media (width < 30rem) {
				--via: 0;
			}
		}
	}

	li {
		writing-mode: vertical-lr;
		flex-shrink: 0;
		scroll-margin-left: calc(0.5ch + env(safe-area-inset-left));

		@media (width >= 30rem) {
			&:hover {
				background-color: var(--color-ink);
				color: var(--color-canvas);
			}
		}

		@media (width < 30rem) {
			&:has(span:hover) {
				background-color: var(--color-ink);
				color: var(--color-canvas);
			}
		}
	}
</style>

<script lang="ts">
	let { projects }: { projects: Sanity.Project[] } = $props()
</script>
