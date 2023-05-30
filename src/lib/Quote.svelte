<figure class="max-w-max mb-4">
	<blockquote>
		{#if code}
			<div bind:this={slot} hidden><slot></slot></div>

			{#await highlight(slot?.innerHTML)}
				<p class="text-accent/50">Loading...</p>
			{:then code}
				{@html code}
			{/await}
		{:else}
			<p>
				<q>
					<slot></slot>
				</q>
			</p>
		{/if}
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

<style lang="postcss">
	blockquote :global(pre) {
		background-color: initial !important;
	}

	p {
		text-wrap: balance;
	}

	q {
		quotes: "“" "”" "‘" "’";
	}
</style>

<script lang="ts">
	import highlight from '../utils/highlight'

	export let
		author: string | undefined = undefined,
		cite: string | undefined = undefined,
		code = false

	let slot: HTMLDivElement
</script>
