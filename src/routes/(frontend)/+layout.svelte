<script lang="ts">
	import Header from '@/ui/header.svelte'
	import ProjectList from '@/ui/project-list.svelte'
	import PokemonTeams from '@/ui/pokemon-teams.svelte'
	import CarList from '@/ui/car-list.svelte'
	import LocalTime from '@/ui/local-time.svelte'
	import '@/app.css'

	let { data, children } = $props()
</script>

<svelte:head>
	<title>Mitchell Christ // nuotsu</title>
	<meta name="description" content={data.global?.tagline} />
</svelte:head>

<main class="mx-auto flex max-w-2xl flex-col gap-lh">
	<Header tagline={data.global?.tagline} />
	<ProjectList projects={data.projects} />
	<PokemonTeams teams={data.global?.pokemonTeams ?? []} />
	<CarList cars={data.global?.cars} />
	<LocalTime />
</main>

{@render children?.()}
