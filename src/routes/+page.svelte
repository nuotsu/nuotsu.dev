<section class="grid gap-4 place-content-center">
	<span class="text-7xl select-none">🧢</span>
	<h1>I make websites.</h1>
	<p>
		<button class="action" on:click={onclick}>Nice 👍</button>
		<output>x{reactions.count}</output>
	</p>
</section>

<script>
	import supabase from '@/lib/supabase'
	import { onMount } from 'svelte'

	export let data

	$: ({ reactions } = data)

	async function onclick() {
		await supabase
			.from('reactions')
			.update({ count: reactions.count + 1 })
			.eq('name', reactions.name)
	}

	onMount(() => {
		const subscription = supabase
			.channel('any')
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'reactions' },
				payload => {
					reactions = payload.new
				}
			)
			.subscribe()

		return () => {
			subscription.unsubscribe()
		}
	})
</script>
