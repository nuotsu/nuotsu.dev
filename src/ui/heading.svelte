<script lang="ts">
	let { value }: { value: string } = $props()

	let words = $derived(value.split(' '))
</script>

<h2 class="h1" aria-label={value}>
	{#each words as word, i}
		<span class="inline-block">
			{#each word as letter, j}
				<span class="inline-block">
					{#if i === 0 && j === 0}
						<span class="group grid *:col-span-full *:row-span-full">
							<span class="font-serif italic group-hover:text-transparent"
								>{letter}</span
							>
							<span
								class=" font-sans group-not-hover:text-transparent"
								aria-hidden="true">{letter}</span
							>
						</span>
					{:else}
						<span class="hover:font-serif">{letter}</span>
					{/if}
				</span>
			{/each}
		</span><!--  
		-->{#if i < words.length}&nbsp;{/if}
	{/each}
</h2>
