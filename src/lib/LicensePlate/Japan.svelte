<code>
	<span class="font-mplus">{plate.region || '横浜'}</span>
	<span class="font-trm mt-[.3ch]">{plate.class || 100}</span>
</code>

<code class="m-auto">
	<small class="font-shippori text-[1.2em]">{plate.prefix || 'あ'}</small>
	<span class="font-trm text-[4em] leading-[0]">{number}</span>
</code>

<style>
	code {
		display: flex;
		align-items: center;
		justify-content: center;
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
