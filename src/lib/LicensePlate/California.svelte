<div class="relative" data-type={plate.type}>
	<em class="pointer-events-none absolute inset-0 bottom-auto">
		California
	</em>

	<Stickers {date} />
</div>

<code
	class="grow grid place-content-center font-dealerplate text-[3.8em]"
	data-type={plate.type}
>
	{number}
</code>

<style>
	[data-type="ca"] em {
		color: #fe0d00;
		font-size: 1.6em;
		@apply font-california;
	}

	[data-type="ca-legacy"] em {
		margin-top: .2ch;
		letter-spacing: .2ch;
		text-transform: uppercase;
		@apply font-platnomor not-italic;
	}
</style>

<script>
	import moment from 'moment'
	import Stickers from './Stickers.svelte'

	export let work

	const { plate, date } = work

	const number = plate.number || sequence()

	function sequence() {
		const words = work.title.split(/[\s-]/g)
		const letters = words.length >= 3
			? words.map(word => word[0]).join(``).slice(0, 3)
			: abbreviate(words)

		const date_num = moment(date).format('MD')
		const [start, end] = date_num.length === 4
			? [date_num.slice(0, 1), date_num.slice(1)]
			: [9, date_num.padStart(3, 0)]

		return `${start}${letters.toUpperCase()}${end}`
	}

	function abbreviate([first, ...words], start = '') {
		const letters = (start + first).slice(0, 3)

		return letters.length >= 3
			? letters
			: abbreviate(words, letters)
	}
</script>
