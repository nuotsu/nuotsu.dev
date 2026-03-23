<script lang="ts">
	import { writing } from '$lib/constants'
</script>

<section class="section">
	<h2 class="sr-only">Writing</h2>

	<ul class="unordered-list">
		{#each writing as item}
			<li>
				<a class="link" href={item.href}>
					{item.title}
				</a>
			</li>
		{/each}
	</ul>
</section>
