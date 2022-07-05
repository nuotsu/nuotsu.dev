import WebAudioApiContent from '$lib/snippets/web-audio-api/content.svelte'
import AngelsCityConnect from '$lib/snippets/angels-city-connect/AngelsCityConnect.svelte'
import MarqueeDemo from '$lib/snippets/marquee/demo.svelte'
import PipewriterDemo from '$lib/snippets/pipewriter/demo.svelte'

export default [
	{
		title: 'Web Audio API',
		id: 'web-audio-api',
		date: '2022-06-22',
		content: WebAudioApiContent,
	},
	{
		title: 'Angels City Connect',
		id: 'angels-city-connect',
		date: '2022-06-11',
		demo: AngelsCityConnect,
	},
	{
		title: 'Marquee',
		id: 'marquee',
		date: '2022-06-08',
		demo: MarqueeDemo,
	},
	{
		title: 'Pipewriter',
		id: 'pipewriter',
		date: '2022-06-05',
		demo: PipewriterDemo,
	},
]
