{#await fetchStars() then stars}
	{#if stars > 0}
		<small class="grayscale anim-fade-to-l">★ {stars}</small>
	{/if}
{/await}

<script lang="ts">
	import { PUBLIC_GITHUB_TOKEN } from '$env/static/public'

	const { repo }: { repo: string } = $props()

	async function fetchStars() {
		const res = await fetch(`https://api.github.com/repos/${repo}`, {
			headers: {
				Authorization: `Bearer ${PUBLIC_GITHUB_TOKEN}`,
			},
		})
		const data = await res.json()
		return data.stargazers_count
	}
</script>
