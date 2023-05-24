<figure class="relative">
	{#if typeof navigator !== 'undefined' && ('mediaDevices' in navigator)}
		{#await navigator.mediaDevices.getUserMedia({ audio: true })}
			Requesting audio permissions...
		{:then stream}
			<audio use:setStream={stream} autoplay muted crossorigin="anonymous" hidden />

			{#if controls}
				<details {open}>
					<summary class="overflow-x-auto">
						<slot name="visualizer"></slot>
					</summary>

					<div class="controls max-w-screen-xl mx-auto px-4">
						<div class="py-2 border border-accent border-dotted">
							<slot></slot>
						</div>
					</div>
				</details>
			{:else}
				<div class="overflow-x-auto">
					<slot name="visualizer"></slot>
				</div>
			{/if}
		{/await}

	{:else}
		<p>Audio not supported</p>
	{/if}
</figure>

<style>
	.controls::before {
		content: '';
		pointer-events: none;
		position: relative;
		display: block;
		margin: 0 auto -.5em;
		width: 1em;
		aspect-ratio: 1;
		border: 1px dotted turquoise;
		border-right: none;
		border-bottom: none;
		background: black;
		rotate: 45deg;
	}
</style>

<script lang="ts">
	export let
		analyzer: AudioAnalysis.Analyzer,
		open = false,
		controls = true

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
