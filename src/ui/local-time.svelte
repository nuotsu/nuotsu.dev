<script lang="ts">
	let time = $state(getLocalTime())

	let [hour, meridiem] = $derived(
		time.toLocaleTimeString('en-US', { hour: 'numeric' }).split(' '),
	)
	let minute = $derived(time.toLocaleTimeString('en-US', { minute: '2-digit' }))

	function getLocalTime() {
		return new Date(
			new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }),
		)
	}

	$effect(() => {
		setInterval(() => (time = getLocalTime()), 1000)
	})
</script>

<div class="flex gap-ch">
	<time datetime={time.toISOString()}>
		{hour}<span>:</span>{minute}
		{meridiem}
	</time>

	<address>Irvine, CA, USA</address>
</div>

<style>
	span {
		animation: blink 1s infinite steps(1, start);
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
</style>
