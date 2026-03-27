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
</script>

<svelte:head>
	<link rel="preconnect" href="https://statsapi.mlb.com" />
	<link rel="preconnect" href="https://midfield.mlbstatic.com" />
</svelte:head>

<article
	class={cn(
		'relative inline-grid min-h-[8.5lh] place-items-center text-center font-sans leading-none',
		className,
	)}
>
	{#await fetchMLB()}
		#ITFDB...
	{:then { liveData }}
		<div class="mb-lh inline-grid grid-cols-2 items-stretch text-white">
			<dl class="m-0 grid -translate-y-[1.5lh] skew-y-15">
				{#each ['away', 'home'] as side}
					{@const { team } = liveData.boxscore.teams[side]}
					{@const logo = `https://midfield.mlbstatic.com/v1/team/${team.id}/spots/64`}

					<div
						class="relative grid grid-cols-2 items-center"
						style:background="url({logo}) 50% 5% / 1000% 4500% no-repeat"
					>
						<dt>
							<img class="block size-[1.5lh]" src={logo} alt={team.name} width={24} height={24} />
						</dt>
						<dd class="m-auto">
							{liveData.linescore.teams[side].runs}
						</dd>
					</div>
				{/each}
			</dl>

			<figure
				class="order-first col-span-full grid place-items-center *:col-span-full *:row-span-full"
			>
				<div class="grid transform-[scale(1.75,0.5)_rotate(45deg)] grid-cols-2 gap-[1.5lh]">
					{#each [1, 0, 2] as base}
						<span class="block size-[.5lh] outline"></span>
					{/each}
				</div>

				<span class="translate-y-1/3">{liveData.linescore.currentInningOrdinal}</span>
			</figure>

			{#snippet count(length: number, count: number)}
				<dd class="m-0 flex gap-[inherit]">
					{#each Array.from({ length }) as _, i}
						<span
							class={cn(
								'block size-[.5lh] rounded-full',
								count >= i + 1 ? 'bg-current' : 'bg-linear-to-t from-white/25 to-transparent',
							)}
						></span>
					{/each}
					<span class="sr-only">{count}</span>
				</dd>
			{/snippet}

			<div class="grid -translate-y-[1.5lh] -skew-y-15 place-items-center bg-black">
				<dl
					class="m-0 grid max-w-max grid-cols-[auto_1fr] items-center gap-[2px] [&_dt]:text-[calc(1lh-5px)]"
				>
					<dt class="[&+*>span]:text-[limegreen]"><abbr title="Balls">B</abbr></dt>
					{@render count(3, liveData.linescore.balls)}
					<dt class="[&+*>span]:text-[yellow]"><abbr title="Strikes">S</abbr></dt>
					{@render count(2, liveData.linescore.strikes)}
					<dt class="[&+*>span]:text-[red]"><abbr title="Outs">O</abbr></dt>
					{@render count(2, liveData.linescore.outs)}
				</dl>
			</div>
		</div>
	{:catch error}
		<h1>Error</h1>
		{error.message}
	{/await}

	<a href="https://mlb.theohtani.com/schedule" class="absolute inset-0 text-transparent">
		View on my MLB scorebug app
	</a>
</article>

<style>
	abbr {
		text-decoration: none;
	}
</style>
