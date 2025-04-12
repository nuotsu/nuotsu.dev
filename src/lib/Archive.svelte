<script lang="ts">
	let { projects }: { projects: Sanity.Project[] } = $props()
</script>

<article id="archive" class="px-[1ch]">
	<h2 class="sticky-header">Archive</h2>

	<ul class="full-bleed no-scrollbar flex max-w-max overflow-x-auto px-[0.5ch] whitespace-nowrap">
		{#each projects as project}
			{@const domain = project.url.replace(/^https?:\/\/(www\.)?/, '')}

			<li data-year={new Date(project.startDate).getFullYear()}>
				{#if project.redacted}
					<span>{domain.replace(/(?<=\b[a-zA-Z0-9]+)[a-z0-9]/g, '*')}</span>
				{:else}
					<a href={project.url}>{domain}</a>
				{/if}
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

			@media (width >= 64rem) {
				&:has(li:hover) {
					mask: none;
				}
			}

			@media (width < 64rem) {
				&:has(li span:hover) {
					mask: none;
				}
			}
		}
	}

	li {
		writing-mode: vertical-lr;
		flex-shrink: 0;
		scroll-margin-left: calc(0.5ch + env(safe-area-inset-left));
		padding-inline: 0.5ch;

		@media (width >= 64rem) {
			&:hover {
				background-color: var(--color-ink);
				color: var(--color-canvas);
			}

			ul:has(li:hover) > &:not(:hover) {
				font-weight: normal;
				opacity: 0.5;
			}
		}

		@media (width < 64rem) {
			&:has(span:hover) {
				background-color: var(--color-ink);
				color: var(--color-canvas);
			}

			ul:has(li span:hover) > &:not(:hover) {
				font-weight: normal;
				opacity: 0.5;
			}
		}
	}
</style>
