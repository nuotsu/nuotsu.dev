<time datetime={date}>
	<span class="sticker month">{moment(date).format('MMM')}</span>
	<span class="sticker year">{moment(date).format('Y')}</span>
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
		background-color: #40b997;
		@apply text-black/70;
	}
</style>

<script>
	import moment from 'moment'

	export let date
</script>
