<Section title="Snippets">
	<ul>
		{#each snippets as { title, id }}
			{@const active = id === $page.params.id}

			<li>
				<a class="link" href="/snippets/{id}">
					{title}
				</a>
				{#if active}<span class="is-active" />{/if}
			</li>
		{/each}
	</ul>
</Section>

<script>
	import Section from '$lib/Section.svelte'
	import snippets from '$lib/snippets/all-snippets'
	import { page } from '$app/stores'
</script>
