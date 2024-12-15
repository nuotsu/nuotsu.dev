{#if stargazers > 0}
	<span class="anim-fade-to-r inline-block">★{stargazers}</span>
{/if}

{#if forks > 0}
	<span class="anim-fade-to-r inline-block">⑂{forks}</span>
{/if}

<script lang="ts">
	let { repo }: { repo?: string } = $props()

	let stargazers = $state(0)
	let forks = $state(0)

	$effect.pre(() => {
		fetch(`/api/github?repo=${repo}`)
			.then((res) => res.json())
			.then((data) => {
				stargazers = data.stargazers
				forks = data.forks
			})
	})
</script>
