<a href={work.url} target="_blank" rel="noreferrer">
	{work.title}

	<time>{moment(work.date).format('MM-DD')}</time>
</a>

<style>
	a {
		@apply text-ink-jp;
	}
</style>

<script>
	import moment from 'moment'

	export let work
</script>
