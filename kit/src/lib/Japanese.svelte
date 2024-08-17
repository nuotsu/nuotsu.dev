{#if text}
	<span class="text-ink font-cursive text-6xl w-full" lang="ja">
		{text}
	</span>
{/if}

<style>
	:global(a:not(:hover)) > span {
		display: none;
	}

	span {
		pointer-events: none;
		position: fixed;
		inset: auto 50% 50% auto;
		translate: 50% 50%;
		text-align: center;
		font-style: normal;
	}
</style>

<script lang="ts">
	const { text }: { text: string } = $props()
</script>
