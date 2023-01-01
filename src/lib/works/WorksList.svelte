<section class="section">
	<ul class="grid gap-y-8 gap-x-4 text-center">
		{#each works as work}
			<Work {work} />
		{/each}
	</ul>
</section>

<style>
	ul {
		grid-template-columns: repeat(auto-fill, minmax(var(--size, 12em), 1fr));
	}

	@media (max-width: 767px) {
		ul {
			--size: 10em;
		}

		ul :global(figure) {
			font-size: .8em;
		}
	}
</style>

<script>
	import { page } from '$app/stores'
	import Work from './Work.svelte'

	const { works } = $page.data
</script>
