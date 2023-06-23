<figure>
	<blockquote>
		<p class="italic"><slot></slot></p>
	</blockquote>

	{#if cite}
		<figcaption class="text-right text-xs">
			<cite>— {cite}</cite>
		</figcaption>
	{/if}
</figure>

<script lang="ts">
	export let cite: string | undefined = undefined
</script>
