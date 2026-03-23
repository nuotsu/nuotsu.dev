<script lang="ts">
	import { archive } from '$lib/constants'
</script>

<section class="section">
	<h2 class="sr-only">Site Archive</h2>

	<ul class="unordered-list tabular-nums">
		{#each archive as item}
			<li>
				<a class="link" href={item.href}>
					<time datetime={item.date}>{item.date}</time>
				</a>
			</li>
		{/each}
	</ul>
</section>
