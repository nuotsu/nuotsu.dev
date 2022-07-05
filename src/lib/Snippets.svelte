<Section title="Snippets">
	<ul>
		{#each snippets as { title, id }}
			{@const active = id === $page.params.id}

			<li>
				<a class="link" class:active href="/snippets/{id}">
					{title}
				</a>
			</li>
		{/each}
	</ul>
</Section>

<style>
	.active {
		font-weight: bold;
	}
</style>

<script>
	import { page } from '$app/stores'
	import Section from './Section.svelte'
	import snippets from './snippets/all-snippets'
</script>
