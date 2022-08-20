<Section title="Works">
	<ul>
		{#each works as { title, url, date }}
			<li>
				<a class="link" href={url} target="_blank">
					{title || url.replace(/^https?:\/\//, '')}
				</a>
			</li>
		{/each}
	</ul>
</Section>

<script>
	import Section from '$lib/Section.svelte'

	const works = [
		{
			title: 'nuotsu.dev',
			url: 'https://npmjs.com/package/nuotsu.dev',
			date: '2022-07-27'
		},
		{ url: 'https://shoheihomeground.netlify.app', date: '2022-07-26' },
		{ url: 'https://vj-midi.netlify.app', date: '2022-07-18' },
		{ url: 'https://djviz.netlify.app', date: '2022-07-03' },
		{
			title: 'react-custom-hubspot-form',
			url: 'https://npmjs.com/package/react-custom-hubspot-form',
			date: '202-06-18',
		},
		{ url: 'https://ohtani.fun', date: '2022-3-25' },
		{
			title: 'shopadop',
			url: 'https://npmjs.com/package/shopadop',
			date: '2022-1-31',
		},
		{ url: 'https://cuscousainc.com', date: '2021-02-01' },
	]
</script>
