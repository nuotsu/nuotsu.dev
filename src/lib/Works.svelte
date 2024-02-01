<section class="section space-y-2">
	{#each works as work, i}
		<a
			href={work.url}
			class="entity bg-black/20 backdrop-blur-sm {work.className}"
			style:top="{i * 0.25 + 2}rem"
			style:rotate={rotate()}
		>
			<dl class="flex items-center gap-2">
				<dt class="line-clamp-1 grow">{work.title}</dt>
				<dd class="shrink-0 text-xs">
					<time datetime={work.date}>
						{format(new Date(work.date + 'T00:00:00'))}
					</time>
				</dd>
			</dl>
		</a>
	{/each}
</section>

<script lang="ts">
	import rotate from './rotate'

	type Work = {
		title: string
		url: string
		date: string
		className: string
	}

	const works: Work[] = [
		{
			title: '🗓️ VertiCal',
			url: 'https://verti-cal.vercel.app',
			date: '2024-01-31',
			className: 'hover:bg-gradient-to-r from-transparent to-rose-600',
		},
		{
			title: '⛵️ Midjourney Prompter',
			url: 'https://midjourney-prompter.vercel.app',
			date: '2024-01-22',
			className: 'hover:bg-[#061434] hover:text-[#7d9ddf]',
		},
		{
			title: '🧢 TheOhtani.com',
			url: 'https://theohtani.com',
			date: '2024-01-02',
			className: 'hover:bg-[#005596]',
		},
		{
			title: '💀 Neo-rock Band discography website',
			url: 'https://attentionmonsters.com',
			date: '2023-12-25',
			className: 'hover:bg-gradient-to-r from-[#32909c] to-[#d7723e]',
		},
		{
			title: '🌬️ Next.js + Sanity.io + Tailwind CSS starter template',
			url: 'https://github.com/nuotsu/next-sanity-template',
			date: '2023-12-02',
			className: 'hover:text-[#38bdf8]',
		},
		{
			title: '🕰️ Timeless Shopify Theme',
			url: 'https://timeless-docs.vercel.app/',
			date: '2023-08-20',
			className: 'hover:bg-gradient-to-r from-transparent to-[#333]',
		},
		{
			title: '🔢 Numeration',
			url: 'https://numeration.vercel.app/',
			date: '2023-07-09',
			className: 'hover:bg-gradient-to-r from-transparent to-[#11bc4f]',
		},
		{
			title: '📻 Vibes Machine',
			url: 'https://vibes-machine.vercel.app/',
			date: '2023-06-04',
			className: 'hover:bg-[#f7f7f7] hover:text-[#2664f6]',
		},
		{
			title: '🤷‍♂️ The Artificial Blog',
			url: 'https://blog-not.vercel.app',
			date: '2023-05-30',
			className: 'hover:bg-white hover:text-black',
		},
		{
			title: '👒 ONE PIECE Quote API',
			url: 'https://onepiece-api.netlify.app',
			date: '2022-07-25',
			className: 'hover:bg-[#f4e8d2] hover:text-black',
		},
		{
			title: '💿 DJ ViZ (MIDI Visualizer)',
			url: 'https://djviz.netlify.app',
			date: '2022-06-21',
			className: 'hover:text-[#f00]',
		},
		{
			title: '🐶 OC-based Digital Marketing Agency website',
			url: 'https://human.marketing',
			date: '2021-04-28',
			className: 'hover:bg-white hover:text-[#ff5a2f]',
		},
		{
			title: '🏎️ Vehicle Performance Parts website',
			url: 'https://cuscousainc.com',
			date: '2021-03-12',
			className: 'hover:bg-[#ed3137]',
		},
	]

	const { format } = new Intl.DateTimeFormat('en', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})
</script>
