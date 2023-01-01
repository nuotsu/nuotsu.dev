<div class="relative" data-type={plate.type}>
	<em>California</em>

	<Stickers {date} />
</div>

<code data-type={plate.type}>
	{number}
</code>

<style>
	em {
		pointer-events: none;
		position: absolute;
		inset: 0 0 auto;
	}

	code {
		flex-grow: 1;
		display: grid;
		place-content: center;
		color: #1f2a64;
		font-size: 3.8em;
		@apply font-dealerplate;
	}

	[data-type="ca"] em {
		color: #fe0d00;
		font-size: 1.6em;
		@apply font-california;
	}

	[data-type="ca-legacy"] {
		background-color: #000;
		color: #f1c839;
	}

	[data-type="ca-legacy"] em {
		text-transform: uppercase;
		@apply not-italic;
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
			? [date_num.slice(0, 2), date_num.slice(2)]
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
