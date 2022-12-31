<div>
	<i>California</i>
</div>

<div class="m-auto">
	{number}
</div>

<style>
	i {
		color: #fe0d00;
		font-family: cursive;
	}

	div {
		color: #1f2a64;
	}
</style>

<script>
	import moment from 'moment'

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
