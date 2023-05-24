<figure>
	<blockquote>
		<p>
			<q>
				<slot></slot>
			</q>
		</p>
	</blockquote>

	{#if author}
		<figcaption class="text-right">
			—
			{#if cite}
				<cite>
					<a class="link" href={cite}>
						{author}
					</a>
				</cite>
			{:else}
				{author}
			{/if}
		</figcaption>
	{/if}
</figure>

<style>
	q {
		quotes: "“" "”" "‘" "’";
	}
</style>

<script lang="ts">
	export let
		author: string | undefined = undefined,
		cite: string | undefined = undefined
</script>
