<script lang="ts">
	const { domains }: { domains: Sanity.Domain[] } = $props()
</script>

<section>
	<h2 class="sticky-header px-[1ch]">Domain</h2>

	<ul>
		{#each domains as domain}
			<li>
				{domain.name}
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
		}
	}
</style>
