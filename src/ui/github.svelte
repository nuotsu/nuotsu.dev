<script lang="ts">
	import { browser } from '$app/environment'
	import { count } from '$lib/utils'

	let { repo, class: className = '' } = $props()

	async function fetchGithub() {
		const res = await fetch(`/api/github?repo=${repo}`)
		const data = await res.json()
		return data satisfies App.GithubResponse
	}
</script>

{#if browser && repo}
	{#await fetchGithub() then { stars, forks }}
		<small
			class="flex gap-ch whitespace-nowrap text-current/50 tabular-nums transition-opacity duration-400 starting:opacity-0 {className}"
			title={[count(stars, 'star'), count(forks, 'fork')]
				.filter(Boolean)
				.join(', ')}
		>
			{@render data(forks, '🍴')}
			{@render data(stars, '⭐')}
		</small>
	{/await}
{/if}

{#snippet data(value: number, emoji: string)}
	{#if value > 0}
		<span class="inline-flex items-center"><emoji>{emoji}</emoji>{value}</span>
	{/if}
{/snippet}

<style>
	emoji {
		background-color: currentColor;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		font-size: xx-small;
	}
</style>
