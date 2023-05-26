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

					<div class="section my-0 controls">
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

		{:catch error}
			<slot name="error">
				<p class="text-xs">You missed out on a cool opportunity... 🤷‍♂️</p>
			</slot>
		{/await}

	{:else}
		<p class="text-xs">Audio not supported</p>
	{/if}
</figure>

<style lang="postcss">
	.controls::before {
		content: '';
		pointer-events: none;
		position: relative;
		display: block;
		margin: 0 auto -.5em;
		width: 1em;
		aspect-ratio: 1;
		background: black;
		rotate: 45deg;

		@apply border-t border-l border-dotted border-accent;
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
