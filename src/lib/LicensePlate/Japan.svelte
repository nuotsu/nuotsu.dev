<div>{plate.region || '横浜'} {plate.class || 100}</div>

<div class="m-auto">
	<small>{plate.prefix || 'あ'}</small>
	{number}
</div>

<style>
	div {
		color: #094500;
	}
</style>

<script>
	import moment from 'moment'

	export let work

	const { plate, date } = work

	const number = sequence(plate.number || moment(date).format('MD'))

	function sequence(nums) {
		let separator = nums.length === 4 ? '-' : ' '

		if (nums.length < 4) {
			nums = nums.padStart(4, '・')
		}

		return nums.slice(0, 2) + separator + nums.slice(2)
	}
</script>
