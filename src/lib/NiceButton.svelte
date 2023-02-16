<button
	class="action disabled:cursor-wait"
	on:click={onclick}
	disabled={$reactions.loading}
>
	Nice
	{#key $reactions.count}
		<span class="inline-block">👍</span>
	{/key}
</button>

<style>
	span {
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
	import { reactions } from '@/lib/store'

	async function onclick() {
		$reactions.loading = true

		await supabase
			.from('reactions')
			.update({ count: $reactions.count + 1 })
			.eq('name', $reactions.name)
	}
</script>
