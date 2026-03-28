<script lang="ts">
	import { cn } from '$lib/utils'
	import type { HTMLAttributes } from 'svelte/elements'

	let { class: className }: HTMLAttributes<HTMLDivElement> = $props()

	async function fetchMLB() {
		const scheduleParams = new URLSearchParams()
		scheduleParams.set('sportId', '1')
		scheduleParams.set('teamId', '119')

		const scheduleResponse = await fetch(
			`https://statsapi.mlb.com/api/v1/schedule?${scheduleParams.toString()}`,
		)
		const { dates } = await scheduleResponse.json()
		const { gamePk } = dates.at(-1)?.games.at(-1) ?? {}

		if (!gamePk) throw new Error('No gamePk found')

		const feedLiveParams = new URLSearchParams()
		feedLiveParams.set('fields', '')

		const feedLiveResponse = await fetch(
			`https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live?${feedLiveParams.toString()}`,
		)
		return feedLiveResponse.json()
	}

	const { format } = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: '2-digit',
	})
</script>

<svelte:head>
	<link rel="preconnect" href="https://statsapi.mlb.com" />
	<link rel="preconnect" href="https://midfield.mlbstatic.com" />
</svelte:head>

<article class={cn('relative inline-grid text-center font-sans leading-none', className)}>
	{#await fetchMLB()}
		#ITFDB...
	{:then { liveData, gameData }}
		{@const isPreview = gameData.status.abstractGameState === 'Preview'}

		<dl
			class="m-0 grid items-stretch text-white not-has-[time]:grid-cols-2 has-[time]:grid-cols-[1fr_1fr_auto]"
		>
			{#each ['away', 'home'] as side}
				{@const { team } = liveData.boxscore.teams[side]}
				{@const logo = `https://midfield.mlbstatic.com/v1/team/${team.id}/spots/64`}

				<div
					class="relative grid items-center has-[dd]:grid-cols-2"
					style:background="url({logo}) 50% 5% / 1000% 4500% no-repeat"
				>
					<dt>
						<img class="block size-[1.5lh]" src={logo} alt={team.name} width={24} height={24} />
					</dt>

					{#if !isPreview}
						<dd class="m-auto">
							{liveData.linescore.teams[side].runs}
						</dd>
					{/if}
				</div>
			{/each}

			{#if isPreview}
				<dd class="m-0 ml-ch grid place-content-center text-xs">
					<time datetime={gameData.datetime.dateTime}>
						@ {format(new Date(gameData.datetime.dateTime))}
					</time>
				</dd>
			{/if}
		</dl>
	{:catch error}
		<h1>Error</h1>
		{error.message}
	{/await}

	<a href="https://mlb.theohtani.com/schedule" class="absolute inset-0 text-transparent">
		View on my MLB scorebug app
	</a>
</article>
