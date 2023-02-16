{#await getReactions()}
	<span class="action">
		Nice 👍
	</span>
{:then}
	<button
		class="relative z-[1] action disabled:cursor-wait"
		on:click={onclick}
		disabled={$reactions.loading}
	>
		Nice
		{#key $reactions.count}
			<span class="emoji">👍</span>
		{/key}
	</button>
{/await}

<style>
	.emoji {
		display: inline-block;
		transform-origin: bottom left;
		animation: nice .2s ease-in-out forwards;
	}

	@keyframes nice {
		from {
			opacity: 0;
			rotate: -30deg;
		}
	}
</style>

<script>
	import supabase from '@/lib/supabase'
	import { getReactions, reactions } from '@/lib/store'

	async function onclick() {
		$reactions.loading = true

		await supabase
			.from('reactions')
			.update({ count: $reactions.count + 1 })
			.eq('name', $reactions.name)
	}
</script>
