<Section title="Works">
	<ul>
		{#each works as { title, url, date }}
			<li>
				<a class="link" href={url} target="_blank" rel="noreferrer noopener">
					{title || url.replace(/^https?:\/\//, '')}
				</a>
			</li>
		{/each}
	</ul>
</Section>

<script>
	import Section from './Section.svelte'

	const works = [
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
