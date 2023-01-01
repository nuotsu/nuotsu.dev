<time datetime={date}>
	<span class="sticker month">{moment(date).format('MMM')}</span>
	<span class="sticker year" data-year={year}>{year}</span>
</time>

<style>
	time {
		display: flex;
		justify-content: space-between;
	}

	.sticker {
		margin: 1ch;
		padding: 0 .5ch;
		font-size: 0.6em;
		font-weight: bold;
		@apply shadow-sm;
	}

	.month {
		text-transform: uppercase;
		color: #332189;
		@apply bg-white;
	}

	.year {
		@apply text-black/70;
	}

	[data-year="2023"] { background-color: #e45a02; }
	[data-year="2022"] { background-color: #40b997; }
	[data-year="2021"] { background-color: #bb3d28; }
</style>

<script>
	import moment from 'moment'

	export let date

	const year = moment(date).format('YYYY')
</script>
