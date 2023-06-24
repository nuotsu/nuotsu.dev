<figure class="flex gap-4 items-end">
	<blockquote>
		<p class="italic"><slot></slot></p>
	</blockquote>

	{#if cite}
		<figcaption class="ml-auto text-xs">
			<cite>— {cite}</cite>
		</figcaption>
	{/if}
</figure>

<script lang="ts">
	export let cite: string | undefined = undefined
</script>
