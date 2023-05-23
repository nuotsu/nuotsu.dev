<figure class="relative">
	{#if typeof navigator !== 'undefined' && ('mediaDevices' in navigator)}
		{#await navigator.mediaDevices.getUserMedia({ audio: true })}
			Requesting audio permissions...
		{:then stream}
			<audio use:setStream={stream} autoplay muted crossorigin="anonymous" hidden />

			<details {open}>
				<summary class="overflow-x-auto">
					<slot name="visualizer"></slot>
				</summary>

				<div class="py-2 mx-4 border-[2.5px] border-dotted">
					<slot></slot>
				</div>
			</details>
		{/await}

	{:else}
		<p>Audio not supported</p>
	{/if}
</figure>

<script lang="ts">
	export let
		analyzer: AudioAnalysis.Analyzer,
		open: boolean = false

	function setStream(node: HTMLAudioElement, stream: MediaStream | null) {
		if (!node || !stream) return

		node.srcObject = stream

		let audioCtx = new AudioContext()

		$analyzer = audioCtx.createAnalyser()
		$analyzer.connect(audioCtx.destination)

		audioCtx
			.createMediaStreamSource(stream)
			.connect($analyzer)

		return {
			update(newStream: MediaStream) {
				if (node.srcObject !== newStream) {
					node.srcObject = newStream
				}
			},
			destroy() {
				node.srcObject = null
			},
		}
	}
</script>
