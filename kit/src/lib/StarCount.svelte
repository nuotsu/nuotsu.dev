{#if stars > 0}
	<small class="grayscale anim-fade-to-l">★ {stars}</small>
{/if}

<script lang="ts">
	import { onMount } from 'svelte'

	const { repo }: { repo: string } = $props()

	let stars = $state(0)

	onMount(async () => {
		stars = await fetchStars()
	})

	async function fetchStars() {
		const res = await fetch(`https://api.github.com/repos/${repo}`)
		const data = await res.json()
		return data.stargazers_count
	}
</script>
