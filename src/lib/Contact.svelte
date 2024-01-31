<section
	class="section grid gap-2 text-center sm:grid-cols-[repeat(auto-fill,minmax(100px,1fr))]"
>
	{#each contacts as contact}
		<a
			class="entity grow whitespace-nowrap"
			href={contact.url}
			style:rotate={rotate(4)}
		>
			{contact.title}
		</a>
	{/each}
</section>

<script lang="ts">
	import rotate from './rotate'

	type Contact = {
		title: string
		url: string
	}

	const contacts: Contact[] = [
		{
			title: '📧 Email',
			url: 'mailto:xzmaru@gmail.com',
		},
		{
			title: '🐦 Twitter',
			url: 'https://twitter.com/marutchell',
		},
		{
			title: '⛵️ Midjourney',
			url: 'https://twitter.com/pinstripes_ai',
		},
		{
			title: '🔗 LinkedIn',
			url: 'https://www.linkedin.com/in/nuotsu',
		},
	]
</script>
