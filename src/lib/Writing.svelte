<section>
	<h2 class="sticky-header px-[1ch]">Writing</h2>

	<ul>
		{#each writings as writing}
			<li class="flex justify-between gap-[1ch]">
				<a class="line-clamp-1" href={writing.url}>{writing.title}</a>

				<time class="shrink-0 font-normal" datetime={writing.date}>
					{writing.date.replace(/-/g, '.')}
				</time>
			</li>
		{/each}
	</ul>
</section>

<style>
	li {
		padding-inline: 1ch;

		&:hover {
			background-color: var(--color-ink);
			color: var(--color-canvas);

			& time {
				font-weight: 700;
			}
		}
	}
</style>

<script lang="ts">
	const { writings }: { writings: Sanity.Writing[] } = $props()
</script>
