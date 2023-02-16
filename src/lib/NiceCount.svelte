<output class="select-none px-[1em]">
	{#each count.split('') as digit, i ([i,digit].join(','))}
		<span class="inline-block">{digit}</span>
	{/each}
</output>

<style>
	span {
		animation: count .2s ease-in-out forwards;
	}

	@keyframes count {
		from {
			opacity: 0;
			translate: 0 -.25em;
		}
	}
</style>

<script>
	import supabase from '@/lib/supabase'
	import { reactions } from '@/lib/store'
	import { onMount } from 'svelte'

	const { format } = new Intl.NumberFormat('en-US', {})

	$: count = format($reactions.count)

	onMount(() => {
		const subscription = supabase
			.channel('any')
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'reactions' },
				payload => {
					$reactions = {
						loading: false,
						...payload.new
					}
				}
			)
			.subscribe()

		return () => {
			subscription.unsubscribe()
		}
	})
</script>
