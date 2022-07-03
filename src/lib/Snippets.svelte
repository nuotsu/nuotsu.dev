<section>
	<h2>Snippets</h2>

	<ul>
		{#each snippets as { title, id }}
			<li>
				<a class="link" href="/snippets/{id}">
					{title}
				</a>
			</li>
		{/each}
	</ul>
</section>

<script>
	import snippets from '$lib/snippets'
</script>
