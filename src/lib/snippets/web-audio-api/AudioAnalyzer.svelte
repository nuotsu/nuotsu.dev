{#await getMedia({ audio: true }) then stream}
	<audio use:srcObject={stream} autoplay crossorigin="anonymous" />
{:catch}
	🙅‍♂️
{/await}

<script>
	async function getMedia(constraints) {
		if ('navigator' in window) {
			return navigator.mediaDevices.getUserMedia(constraints)
		}
	}

	function srcObject(node, stream) {
		if (!stream) return

		node.srcObject = stream

		let audioCtx = new AudioContext()

		$analyzer = audioCtx.createAnalyser()
		$analyzer.connect(audioCtx.destination)

		audioCtx
			.createMediaElementSource(node)
			.connect($analyzer)

		return {
			update(newStream) {
				if (node.srcObject != newStream) {
					node.srcObject = newStream
				}
			}
		}
	}
</script>

<script context="module">
	import { writable } from 'svelte/store'

	export const analyzer = writable(null)
</script>
