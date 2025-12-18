<script lang="ts">
	import Section from './section.svelte'

	const projects = {
		SanityPress: 'https://sanitypress.dev',
		'SanityPress with Typegen': 'https://typed.sanitypress.dev',
		'MLB Live Scorebug': 'https://sb3.theohtani.com',
		'icon.dev': 'https://icon.dev',
		'GitHub iframe': 'https://github-iframe.vercel.app',
		'Attention Monsters': 'https://attentionmonsters.com',
		'Human Marketing': 'https://human.marketing',
		'CUSCO USA': 'https://cuscousainc.com',
	}
</script>

<Section
	id="projects"
	heading="Projects"
	class="prose"
	inspect="src/ui/sections/projects.svelte"
>
	<ul>
		{#each Object.entries(projects) as [name, href]}
			<li>
				<a {href}>{name}</a>
			</li>
		{/each}
	</ul>

	<p>
		Meanwhile, check out my
		<a class="link" href="https://github.com/nuotsu">GitHub</a>.
	</p>
</Section>
