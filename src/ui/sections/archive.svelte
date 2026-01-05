<script lang="ts">
	import Headline from '$ui/headline.svelte'
	import SourceCode from '$ui/source-code.svelte'

	const archive: {
		date: string
		href: string
	}[] = [
		{
			date: '2025-01-01',
			href: 'https://nuotsu-k6pai8508-nuotsu-dev.vercel.app',
		},
		{
			date: '2025-10-12',
			href: 'https://nuotsu-pq62v9mci-nuotsu-dev.vercel.app',
		},
		{
			date: '2025-06-06',
			href: 'https://nuotsu-efn92y0tg-nuotsu-dev.vercel.app',
		},
		{
			date: '2025-04-12',
			href: 'https://nuotsu-mgju9mkd8-nuotsu-dev.vercel.app',
		},
		{
			date: '2024-08-29',
			href: 'https://nuotsu-nzdu576ej-nuotsu-dev.vercel.app',
		},
		{
			date: '2024-01-31',
			href: 'https://nuotsu-2yrf9f4yh-nuotsu.vercel.app',
		},
		{
			date: '2024-01-03',
			href: 'https://nuotsu-ifilajouv-nuotsu.vercel.app',
		},
		{
			date: '2023-11-27',
			href: 'https://nuotsu-nr6to8p7q-nuotsu.vercel.app',
		},
		{
			date: '2023-07-10',
			href: 'https://nuotsu-hlkyttey7-nuotsu.vercel.app',
		},
		{
			date: '2023-06-01',
			href: 'https://nuotsu-86qrxo1n7-nuotsu.vercel.app',
		},
		{
			date: '2023-05-14',
			href: 'https://nuotsu-j532rd3mh-nuotsu.vercel.app',
		},
	]
</script>

<section>
	<Headline>Archive</Headline>

	<ul class="grid text-center tabular-nums">
		{#each archive as { date, href }}
			<li>
				<a class="block" {href}>{date}</a>
			</li>
		{/each}
	</ul>

	<SourceCode file="src/ui/sections/archive.svelte" />
</section>

<style>
	ul {
		grid-template-columns: repeat(auto-fill, minmax(9ch, 1fr));
	}
</style>
